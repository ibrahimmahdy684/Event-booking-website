import React,{useState,useEffect} from "react";
import axios from "axios";

const eventList=()=>{
    const[events,setEvents]=useState([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

    useEffect(()=>{
        axios.get('https://localHost:3000/api/v1/users/events')
        .then(response=>{
        setEvents(response.data);
        setLoading(false);
        }).catch(error=>{
            setError('Failed to fetch events');
            setLoading(false);
        });
    },[events]);
    if(loading)return <div>loading events...</div>
    if(error)return <div>{error}</div>
    return(
        <div className="eventsList">
            <h2>Events</h2>
            <div className="eventCards">
                {events.map(event=>{
                    <div key={event.id} className="eventCard">
                        <h3>{event.title}</h3>
                        
                    </div>
                })}
            </div>
        </div>
    )
}