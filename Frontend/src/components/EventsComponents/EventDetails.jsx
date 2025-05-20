import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import {toast} from 'react-toastify'

const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};
const EventDetails=()=>{
const { id } = useParams();
const [loading, setLoading] = useState(true);

const [event,setEvent]=useState(null);




useEffect(() => {
  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to retrieve event details");
    } finally {
      setLoading(false);
    }
  };

  fetchEvent();
}, [id]);

if (loading || !event) return <div><LoadingSpinner /></div>;


return(
    <div className="event-details">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} width="300" />
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Available Tickets:</strong> {event.remainingTickets}</p>
      {isLoggedIn() ? (
        <div>
          <h3>Book Tickets</h3>
          <form>
            <input type="number" min="1" max={event.remainingTickets} placeholder="No. of tickets" />
            <button type="submit">Book Now</button>
          </form>
        </div>
      ) : (
        toast.error("log in first to be able to book tickets")
      )}
      </div>
);
}
export default EventDetails;