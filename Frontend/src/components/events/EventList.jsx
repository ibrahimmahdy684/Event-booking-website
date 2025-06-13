import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import LoadingSpinner from "../layout/LoadingSpinner";
import { toast } from "react-toastify";

import "../../styles/EventList.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const apiBaseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://javascript-event-booking.onrender.com";

    axios
      .get(`${apiBaseUrl}/api/v1/events`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to get events");
        setLoading(false);
      });
  }, []);

  // 🔍 Filter logic
  const filteredEvents = events.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const price = event.ticketPrice || 0;
    const priceMatch =
      (minPrice === "" || price >= parseFloat(minPrice)) &&
      (maxPrice === "" || price <= parseFloat(maxPrice));
    const eventDate = new Date(event.date);
    const startMatch = startDate === "" || eventDate >= new Date(startDate);
    const endMatch = endDate === "" || eventDate <= new Date(endDate);
    return titleMatch && priceMatch && startMatch && endMatch;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="eventsList">
      
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
      <div className="eventCards">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="event-card-empty">No events match the filters.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
