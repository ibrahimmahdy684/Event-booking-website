import React,{useState,useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";

const EventForm=({existingEvent=null})=>{
const [loading,setLoading]=useState(false);
const [formData,setFormData]=useState({
    title:existingEvent?.title||"",
    date:existingEvent?.date||"",
    location:existingEvent?.location||"",
    totalTickets:existingEvent?.totalTickets||"",
    ticketPrice:existingEvent?.ticketPrice||""
});
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit=async (e)=>{
e.preventDefault();
console.log("Form submitted");
const token=localStorage.getItem("token")
setLoading(true);
const url=existingEvent?`http://localhost:3000/api/v1/events/${existingEvent._id}`:'http://localhost:3000/api/v1/events';
const method=existingEvent?"put":"post"
try{
    const response=await axios[method](url,formData,{
      headers: {
             Authorization:`Bearer ${token}`
        },
        withCredentials:true
    }
    );
    toast.success(`Event ${existingEvent? "Updated":"created"} successfully`);
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
        <div>
            <label>Title</label>
            <input name="title" type="text" value={formData.title} onChange={handleChange}/>
        </div>
        <div>
            <label>Date</label>
            <input name="date" type="date" value={formData.date} onChange={handleChange}/>
        </div>
        <div>
            <label>Location</label>
            <input name="location" type="text" value={formData.location} onChange={handleChange}/>
        </div>
        <div>
            <label>Tickets Count</label>
            <input name="totalTickets" type="number" value={formData.totalTickets} onChange={handleChange}/>
        </div>
        <div>
            <label>Ticket Price</label>
            <input name="ticketPrice" type="number" value={formData.ticketPrice} onChange={handleChange}/>
        </div>
        <button type="submit" disabled={loading}>
            {loading? "submitting...":existingEvent?"Update Event":"Create Event"}
        </button>
    </form>
);
};
export default EventForm