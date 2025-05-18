import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "../EventsComponents/EventCard";
import { toast } from "react-toastify";
import BookingDetails from "./BookingDetails";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Fetch current user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/users/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to load your bookings");
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
      await axios.delete(`/api/v1/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("Booking canceled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (bookings.length === 0) {
    return <p className="no-bookings">You haven't booked any events yet.</p>;
  }

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-item">
            <EventCard event={booking.event} />
            <p className="booking-details"><strong>Event:</strong> {booking.event.name}</p>
            <p className="booking-details"><strong>Quantity:</strong> {booking.numberOfTicketsBooked}</p>
            <p className="booking-details"><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <p className="booking-details"><strong>Status:</strong> {booking.bookingStatus}</p>
            <button className="details-button" onClick={() => setSelectedBookingId(booking._id)}>
              View Details
            </button>
            <button className="cancel-button" onClick={() => handleCancel(booking._id)}>
              Cancel Booking
            </button>
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