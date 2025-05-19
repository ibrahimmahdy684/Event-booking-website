import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "../EventsComponents/EventCard";
import { toast } from "react-toastify";
import BookingDetails from "./BookingDetails";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Fetch current user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/v1/users/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Validate response data structure
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid bookings data format");
        }

        setBookings(response.data);
        setError(null);
      } catch (error) {
        console.error("Booking fetch error:", error);
        setError(error.message);
        toast.error(error.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel a booking
  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(`/api/v1/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("Booking canceled successfully");
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <p className="no-bookings">You haven't booked any events yet.</p>;
  }

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-item">
            {booking.event && <EventCard event={booking.event} />}
            <div className="booking-info">
              <p className="booking-details">
                <strong>Event:</strong> {booking.event?.name || "N/A"}
              </p>
              <p className="booking-details">
                <strong>Quantity:</strong> {booking.numberOfTicketsBooked || "0"}
              </p>
              <p className="booking-details">
                <strong>Total Price:</strong> ${booking.totalPrice?.toFixed(2) || "0.00"}
              </p>
              <p className="booking-details">
                <strong>Status:</strong> {booking.bookingStatus || "Unknown"}
              </p>
              <div className="booking-actions">
                <button 
                  className="details-button" 
                  onClick={() => setSelectedBookingId(booking._id)}
                >
                  View Details
                </button>
                <button 
                  className="cancel-button" 
                  onClick={() => handleCancel(booking._id)}
                  disabled={booking.bookingStatus === "CANCELLED"}
                >
                  {booking.bookingStatus === "CANCELLED" ? "Cancelled" : "Cancel Booking"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedBookingId && (
        <BookingDetails
          bookingId={selectedBookingId}
          onClose={() => setSelectedBookingId(null)}
        />
      )}
    </div>
  );
};

export default UserBookingsPage;