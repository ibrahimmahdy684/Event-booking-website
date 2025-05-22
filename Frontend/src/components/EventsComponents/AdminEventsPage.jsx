import React,{useState,useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "./EventCard";
const AdminEventsPage=()=>{
const [events,setEvents]=useState([]);
const [loading,setLoading]=useState(true);
useEffect(()=>{
    const token=localStorage.getItem("token")
    axios.get('http://localhost:3000/api/v1/events/all',{
    headers:{
        Authorization:`Bearer ${token}`
    },
    withCredentials:true
    }).then(response=>{
       setEvents(response)
       setLoading(false)
    }).catch(error=>{
        toast.error("failed to get events");
    })
})
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
  const handleApprove = async (eventId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/events/${eventId}`,
      { status: "Approved" }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    toast.success("Event approved successfully");

    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId ? { ...event, status: "Approved" } : event
      )
    );
  } catch (error) {
    toast.error("Failed to approve event");
  }
};
const handleDecline = async (eventId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/events/${eventId}`,
      { status: "Declined" }, // Only update the status field
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    toast.success("Event declined successfully");

    // Optionally update local state to reflect the change
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId ? { ...event, status: "Declined" } : event
      )
    );
  } catch (error) {
    toast.error("Failed to decline event");
  }
};
if(loading) return <div><LoadingSpinner/></div>
return(
    <div>
        <h2>Events</h2>
        <div>
            {events.map(event=>{
                <EventCard event={event}/>,
                <button onClick={handleApprove}>Approve</button>,
                <button onClick={handleDecline}>Decline</button>,
                <button onClick={handleDelete}>Delete</button>
            })}
        </div>
    </div>
)
}