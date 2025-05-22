import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div><LoadingSpinner /></div>;

  return (
    <div>
      <h2>Events</h2>
      <div>
        {Array.isArray(events) && events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} />
            <button onClick={() => navigate(`/my-events/${event._id}/edit`)}>Edit event</button>
            <button onClick={() => handleDelete(event._id)}>Delete event</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => navigate(`/my-events/new`)}>Create new event</button>
      </div>
      <div>
      <button onClick={()=>navigate(`/my-events/analytics`)}>view events' analytics</button>
      </div>
    </div>
  );
};

export default MyEvents;
