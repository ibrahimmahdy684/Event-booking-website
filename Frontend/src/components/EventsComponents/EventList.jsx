import React,{useState,useEffect} from "react";
import axios from "axios";
import EventCard from "./EventCard";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
const EventList=()=>{
    const[events,setEvents]=useState([]);
    const [loading,setLoading]=useState(true);
    

    useEffect(()=>{
        axios.get('https://localhost:3000/api/v1/events')
        .then(response=>{
        setEvents(response.data);
        setLoading(false);
        }).catch(error=>{
           toast.error("Failed to get events")
            setLoading(false);
        });
    },[]);
    if(loading)return <div><LoadingSpinner/></div>
    
    return(
        <div className="eventsList">
            <h2>Events</h2>
            <div className="eventCards">
                {events.map(event=>(
                    <EventCard key={event._id} event={event}/>
                ))}
            </div>
        </div>
    );
}
export default EventList;