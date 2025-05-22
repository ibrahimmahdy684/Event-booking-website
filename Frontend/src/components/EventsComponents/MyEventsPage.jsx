import React,{useState,useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "./EventCard";
import { useNavigate } from 'react-router-dom';
const MyEvents=()=>{
    const[events,setEvents]=useState([]);
    const[loading,setLoading]=useState(true);
    const Navigate=useNavigate();
    
    useEffect(()=>{
        const token=localStorage.getItem("token");
        axios.get('http://localhost:3000/api/v1/users/events',{
            headers:{
                Authorization:`Bearer${token}`
            },
            withCredentials:true
        }).then(response=>{
            setEvents(response.data);
            setLoading(false);
        }).catch(error=>{
           toast.error("failed to get events");
           setLoading(false);
        })
            
    },[]);
    const handleDelete=({event})=>{
        try{
    
    const response=axios.delete(`http://localhost:3000/api/v1/events/:id`,{
        headers:{
            Authorization:`Bearer${token}`
        },
        withCredentials:true
    })
    toast.success("Event deleted successfully");
        }
catch(error){
  toast.error("Failed to delete event");
}
    }
    if(loading)
        return <div><LoadingSpinner/></div> 
    return(
        <div>
            <h2>Events</h2>
            <div>
                {events.map(event=>{
                    <EventCard event={event}/>,
                    <button onClick={Navigate(`/my-events/${event._id}/edit`)}>Edit event</button>,
                    <button onClick={handleDelete}>Delete event</button>
                })
                }
            </div>
            <div>
                <button onClick={Navigate(`my-events/new`)}>Create new event</button>
            </div>
        </div>
    )
}
export default MyEvents