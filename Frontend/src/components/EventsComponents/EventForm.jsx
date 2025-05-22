import React,{useState,useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { find } from "../../../../Backend/Models/eventModel";
import { validate } from "../../../../Backend/Models/eventModel";
const EventForm=({existingEvent=null})=>{
const [loading,setLoading]=useState(false);
const [formData,setFormData]=useState({
    title:existingEvent?.title||"",
    date:existingEvent?.date||"",
    location:existingEvent?.location||"",
    totalTickets:existingEvent?.totalTickets||"",
    ticketPrice:existingEvent?.ticketPrice||""
});
const handleSubmit=async ()=>{

const token=localStorage.getItem("token")
setLoading(true);
const url=existingEvent?'http://localhost:3000/api/v1/events/:id':'http://localhost:3000/api/v1/events';
const method=existingEvent?"put":"post"
try{
    const response=await axios.method(url,formData,{
      headers: {
             Authorization:`Bearer ${token}`
        },
        withCredentials:true
    }
    );
    toast.success(`Event ${existingEvent? edited:created} successfully`);
}
catch(error){
     toast.error("something went wrong");
}
finally{
    setLoading(false);
}

};
return(
    <form onSubmit={handleSubmit}>
        <div key={title}>
            <label>Title</label>
            <input name="title" type="text" value={formData[title]}/>
        </div>
        <div key={date}>
            <label>Date</label>
            <input name="date" type="date" value={formData[date]}/>
        </div>
        <div key={location}>
            <label>Location</label>
            <input name="location" type="text" value={formData[value]}/>
        </div>
        <div key={totalTickets}>
            <label>Tickets Count</label>
            <input name="totalTickets" type="number" value={formData[totalTickets]}/>
        </div>
        <div key={ticketPrice}>
            <label>Ticket Price</label>
            <input name="ticketPrice" type="number" value={formData[ticketPrice]}/>
        </div>
        <button type="submit" disabled={loading}>
            {loading? "submitting...":existingEvent?"Update Event":"Create Event"}
        </button>
    </form>
);
};
export default EventForm