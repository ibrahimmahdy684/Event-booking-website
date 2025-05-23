import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../admin/ConfirmationDialogue";

import "../../styles/EventList.css";
import "../../styles/MyEvents.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/users/events", {
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
        toast.error("Failed to get events");
        setLoading(false);
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
    <div className="my-events-list">
      <div className="my-events-actions">
        <button
          onClick={() => navigate(`/my-events/new`)}
          className="my-events-action-btn"
        >
          Create New Event
        </button>
        <button
          onClick={() => navigate(`/my-events/analytics`)}
          className="my-events-action-btn"
        >
          View Events Analytics
        </button>
      </div>
      <h2>My Events</h2>
      <div className="eventCards">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="my-event-card-wrapper">
              <EventCard event={event} />
              <div className="my-event-actions">
                <button
                  className="my-event-edit-btn"
                  onClick={() => navigate(`/my-events/${event._id}/edit`)}
                >
                  Edit Event
                </button>
                <button
                  className="my-event-delete-btn"
                  onClick={() => confirmDelete(event._id)}
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="event-card-empty">You have no events.</p>
        )}
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

export default MyEvents;
