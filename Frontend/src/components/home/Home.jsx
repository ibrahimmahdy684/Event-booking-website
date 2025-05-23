import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Home.css";
import LoadingSpinner from "../layout/LoadingSpinner";
import EventCard from "../events/EventCard";
import AnimatedBanner from "../layout/AnimatedBanner";


const Home = () => {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [hotEvents, setHotEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API endpoints, adjust as needed
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/events/home");
        setFeaturedEvent(res.data.featuredEvent);
        setHotEvents(res.data.hotEvents);
        setUpcomingEvents(res.data.upcomingEvents);
      } catch (err) {
        setFeaturedEvent(null);
        setHotEvents([]);
        setUpcomingEvents([]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="home-container">
      <AnimatedBanner />
      {/* Featured Event */}
      {featuredEvent && (
        <div className="featured-event">
          <img
            src={
              featuredEvent.image
                ? featuredEvent.image.startsWith("http")
                  ? featuredEvent.image
                  : `http://localhost:3000/uploads/${featuredEvent.image}`
                : "/placeholder.jpg"
            }
            alt={featuredEvent.title}
          />
          <div className="featured-event-details">
            <div className="featured-event-title">{featuredEvent.title}</div>
            <div className="featured-event-desc">{featuredEvent.description}</div>
            <div className="featured-event-date">
              {new Date(featuredEvent.date).toLocaleString()} | {featuredEvent.location}
            </div>
            <Link to={`/events/${featuredEvent._id}`} className="show-all-btn">
              View Event
            </Link>
          </div>
        </div>
      )}

      {/* Hot Events */}
      <div className="hot-events-section">
        <div className="section-title">Hot Events</div>
        <div className="events-list">
          {hotEvents.length === 0 && <div>No hot events found.</div>}
          {hotEvents.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events-section">
        <div className="section-title">Upcoming Events</div>
        <div className="events-list">
          {upcomingEvents.length === 0 && <div>No upcoming events found.</div>}
          {upcomingEvents.slice(0, 4).map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
        <Link to="/events" className="show-all-btn">
          Show All Events
        </Link>
      </div>
    </div>
  );
};

export default Home;
