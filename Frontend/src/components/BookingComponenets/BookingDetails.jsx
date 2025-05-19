import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingDetails = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
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
        <p><strong>Event:</strong> {booking.event.name}</p>
        <p><strong>Quantity:</strong> {booking.numberOfTicketsBooked}</p>
        <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.bookingStatus}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingDetails;