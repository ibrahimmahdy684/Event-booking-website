import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const StandardUser = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>My Profile</h3>
          <p>View and update your personal information.</p>
          <Link to="/profile" className="dashboard-link">
            Go to Profile
          </Link>
        </div>
        <div className="dashboard-card">
          <h3>My Bookings</h3>
          <p>See all your event bookings and manage them.</p>
          <Link to="/bookings" className="dashboard-link">
            View Bookings
          </Link>
        </div>
        <div className="dashboard-card">
          <h3>Browse Events</h3>
          <p>Find and book tickets for upcoming events.</p>
          <Link to="/events" className="dashboard-link">
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StandardUser;