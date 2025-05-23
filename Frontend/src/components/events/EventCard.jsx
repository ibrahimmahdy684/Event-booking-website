import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className="event-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={event.imageUrl || "/default-event.jpg"}
        alt={event.title}
        className="event-card-img"
      />
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
