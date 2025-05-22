import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

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
    axios
      .get("http://localhost:3000/api/v1/events")
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
    const titleMatch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const price = event.ticketPrice || 0;
    const priceMatch =
      (minPrice === "" || price >= parseFloat(minPrice)) &&
      (maxPrice === "" || price <= parseFloat(maxPrice));

    const eventDate = new Date(event.date);
    const startMatch =
      startDate === "" || eventDate >= new Date(startDate);
    const endMatch =
      endDate === "" || eventDate <= new Date(endDate);

    return titleMatch && priceMatch && startMatch && endMatch;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="eventsList">
      <h2>Events</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
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
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="eventCards">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events match the filters.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
