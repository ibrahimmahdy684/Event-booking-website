import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className="event-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <h3>{event.title}</h3>
      <p>date:{new Date(event.date).toLocaleDateString()}</p>
      <p>location:{event.location}</p>
      <p>price:{event.ticketPrice}</p>
      <p>status:{event.status}</p>
    </div>
  );
};

export default EventCard;
