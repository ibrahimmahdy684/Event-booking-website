import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  // Check for both image and imageUrl fields
  const apiBaseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://javascript-event-booking.onrender.com";

  const coverUrl =
    event.image && event.image !== ""
      ? event.image.startsWith("http")
        ? event.image
        : `${apiBaseUrl}/uploads/${event.image}`
      : event.imageUrl && event.imageUrl !== ""
      ? event.imageUrl.startsWith("http")
        ? event.imageUrl
        : `${apiBaseUrl}/uploads/${event.imageUrl}`
      : "/default-event.jpg";

  return (
    <div className="event-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={coverUrl} alt={event.title} className="event-card-img" />
      <div className="event-card-content">
        <div className="event-card-title">{event.title}</div>
        <div className="event-card-date">
          {new Date(event.date).toLocaleDateString()} |{" "}
          {new Date(event.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="event-card-location">{event.location}</div>
        <div className="event-card-price">
          <span className="price-dot"></span>
          {event.ticketPrice
            ? `Price: EGP ${event.ticketPrice}`
            : event.priceRange
            ? `Price Range: EGP ${event.priceRange}`
            : "Free"}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
