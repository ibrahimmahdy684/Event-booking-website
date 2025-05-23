import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EventForm = () => {
  const { id } = useParams();  // get event id from url params
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);  // loading state for fetching event
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
            date: event.date ? event.date.split("T")[0] : "",  // format date for input[type=date]
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
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading event data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
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
      <div>
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
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : id ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
