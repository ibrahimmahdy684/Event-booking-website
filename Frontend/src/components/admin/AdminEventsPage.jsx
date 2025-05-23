import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import EventCard from "../events/EventCard";
import ConfirmationDialog from "./ConfirmationDialogue"; // Import the dialog

import "../../styles/AdminEventsPage.css";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/events/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("failed to get events");
      });
  }, []);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/v1/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success("Event deleted successfully");
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleApprove = async (eventId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/v1/events/${eventId}`,
        { status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Event approved successfully");

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, status: "Approved" } : event
        )
      );
    } catch (error) {
      toast.error("Failed to approve event");
    }
  };

  const handleDecline = async (eventId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/v1/events/${eventId}`,
        { status: "Declined" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Event declined successfully");

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, status: "Declined" } : event
        )
      );
    } catch (error) {
      toast.error("Failed to decline event");
    }
  };

  // Show confirmation dialog before deleting
  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      handleDelete(eventToDelete);
    }
    setShowDialog(false);
    setEventToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setEventToDelete(null);
  };

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="admin-events-page">
      <h2>Events</h2>
      <div className="admin-events-list">
        {events.map((event) => (
          <div className="admin-event-card-wrapper" key={event._id}>
             <div className={`event-status-badge ${event.status.toLowerCase()}`}>
            {event.status}
          </div>
            <EventCard event={event} />
            <div className="admin-event-actions">
              <button className="approve-btn" onClick={() => handleApprove(event._id)}>
                Approve
              </button>
              <button className="decline-btn" onClick={() => handleDecline(event._id)}>
                Decline
              </button>
              <button className="delete-btn" onClick={() => confirmDelete(event._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this event?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};
export default AdminEventsPage;
