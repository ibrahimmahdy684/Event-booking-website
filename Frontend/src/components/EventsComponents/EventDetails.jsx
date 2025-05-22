import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import BookTicketForm from "../BookingComponenets/BookTicketForm";
const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm,setShowBookingForm]=useState(false);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.log("Error fetching event details:", error);
        toast.error("Failed to retrieve event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading || !event)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} width="300" />
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Available Tickets:</strong> {event.remainingTickets}</p>
      <button onClick={()=>setShowBookingForm(true)}></button>
      {showBookingForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={() => setShowBookingForm(false)}>
        Close
      </button>
      <BookTicketForm event={event} />
    </div>
  </div>
)}
    </div>
  );
};

export default EventDetails;
