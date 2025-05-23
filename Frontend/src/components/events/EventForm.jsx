import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/EventForm.css";

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    totalTickets: "",
    ticketPrice: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
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
            date: event.date ? event.date.split("T")[0] : "",
            location: event.location || "",
            totalTickets: event.totalTickets || "",
            ticketPrice: event.ticketPrice || "",
            image: null,
          });
          if (event.image) {
            setCoverPreview(
              event.image.startsWith("http")
                ? event.image
                : `http://localhost:3000/uploads/${event.image}`
            );
          } else if (event.imageUrl) {
            setCoverPreview(
              event.imageUrl.startsWith("http")
                ? event.imageUrl
                : `http://localhost:3000/uploads/${event.imageUrl}`
            );
          }
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
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      if (files[0]) {
        setCoverPreview(URL.createObjectURL(files[0]));
        setRemoveImage(false);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setCoverPreview(null);
    setRemoveImage(true);
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
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("location", formData.location);
      data.append("totalTickets", formData.totalTickets);
      data.append("ticketPrice", formData.ticketPrice);
      data.append("description", formData.description);
      data.append("category", formData.category);
      if (formData.image) {
        data.append("image", formData.image);
      }
      if (removeImage && id) {
        data.append("image", "");
      }

      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(`Event ${id ? "updated" : "created"} successfully`);
      navigate("/my-events");
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
        {/* Cover Image Preview */}
        <div className="event-cover-image-container">
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Event Cover"
              className="event-cover-image-preview"
            />
          ) : (
            <div className="event-cover-image-placeholder">No Cover Image</div>
          )}
        </div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="event-form-group">
            <label htmlFor="image" className="custom-file-label">
              {coverPreview ? "Change Cover Image" : "Add Cover Image"}
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {formData.image && <div className="file-name">{formData.image.name}</div>}
            {coverPreview && (
              <button
                type="button"
                className="event-remove-image-btn"
                onClick={handleRemoveImage}
                style={{ marginTop: "0.7rem", width: "fit-content" }}
              >
                Remove Image
              </button>
            )}
          </div>
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
          {/* Description input */}
          <div className="event-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              style={{
                resize: "vertical",
                padding: "0.7rem 0.9rem",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                background: "#f9fafb",
              }}
              required
            />
          </div>
          {/* Category input */}
          <div className="event-form-group">
            <label>Category</label>
            <input
              name="category"
              type="text"
              value={formData.category || ""}
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
