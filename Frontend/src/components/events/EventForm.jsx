import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/EventForm.css";

const EventForm = () => {
  const { id } = useParams(); // get event id from url params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); // loading state for fetching event
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    totalTickets: "",
    ticketPrice: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch existing event data when editing
      setFetching(true);
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3000/api/v1/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => {
          const event = res.data;
          setFormData({
            title: event.title || "",
            date: event.date ? event.date.split("T")[0] : "", // format date for input[type=date]
            location: event.location || "",
            totalTickets: event.totalTickets || "",
            ticketPrice: event.ticketPrice || "",
          });
        })
        .catch(() => {
          toast.error("Failed to load event data");
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const url = id
      ? `http://localhost:3000/api/v1/events/${id}`
      : "http://localhost:3000/api/v1/events";
    const method = id ? "put" : "post";

    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(`Event ${id ? "updated" : "created"} successfully`);
      navigate("/my-events"); // Navigate after success
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading event data...</p>;

  return (
    <div className="event-form-container">
      <div className="event-form-card">
        <div className="event-form-title">{id ? "Edit Event" : "Create Event"}</div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="event-form-group">
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="event-form-group">
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="event-form-group">
            <label>Location</label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="event-form-group">
            <label>Tickets Count</label>
            <input
              name="totalTickets"
              type="number"
              value={formData.totalTickets}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
          <div className="event-form-group">
            <label>Ticket Price</label>
            <input
              name="ticketPrice"
              type="number"
              value={formData.ticketPrice}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
            />
          </div>
          <div className="event-form-actions">
            <button className="event-form-submit-btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : id ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
