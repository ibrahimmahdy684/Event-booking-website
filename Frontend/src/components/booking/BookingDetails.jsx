import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/BookingDetails.css";

const BookingDetails = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiBaseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://javascript-event-booking.onrender.com";

        const response = await axios.get(`${apiBaseUrl}/api/v1/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setBooking(response.data);
      } catch (error) {
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Booking Details</h2>
        <p>
          <strong>Event:</strong> {booking.event.title}
        </p>
        <p>
          <strong>Quantity:</strong> {booking.numberOfTicketsBooked}
        </p>
        <p>
          <strong>Total Price:</strong> ${booking.totalPrice}
        </p>
        <p>
          <strong>Status:</strong> {booking.bookingStatus}
        </p>
        <p>
          <strong>Created at:</strong> {booking.createdAt}
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
