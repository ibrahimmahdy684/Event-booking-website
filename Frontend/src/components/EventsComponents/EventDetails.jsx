import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";


const getEventDetails=()=>{
const id=useParams();
const [event,setEvent]=useState(null);
const [error,setError]=useState(null);

useEffect(()=>{
 try{
    const event=axios.get('https://localHost:3000/api/v1/events/:id');
    setEvent(event);
 }
 catch(error){
    setError('failed to fetch event details');
 }
},[id]);
if(error)return <div>{error}</div>
if(!event)return <div><LoadingSpinner/></div>

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
      </div>
);
}
export default getEventDetails;