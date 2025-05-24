import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../layout/LoadingSpinner";
import { toast } from "react-toastify";
import BookingDetails from "./BookingDetails";
import ConfirmationDialog from "../admin/ConfirmationDialogue";
import { useNavigate } from "react-router-dom";

import "../../styles/UserBookingPage.css";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Which booking to show details for
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Which booking to cancel (and whether to show dialog)
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const res = await axios.get(
          "http://localhost:3000/api/v1/users/bookings",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (!Array.isArray(res.data)) throw new Error("Invalid data format");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirmCancel = async () => {
    setShowDialog(false);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/bookings/${bookingToCancel}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setBookings((prev) =>
        prev.filter((b) => b._id !== bookingToCancel)
      );
      toast.success("Booking canceled successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setLoading(false);
      setBookingToCancel(null);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!bookings.length)
    return <p className="no-bookings">You haven't booked any events yet.</p>;

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-card">
            <button
              className="event-title-button"
              onClick={() => navigate(`/events/${booking.event._id}`)}
            >
              {booking.event?.title || "Untitled Event"}
            </button>

            <div className="booking-info">
              <p>
                <strong>Quantity:</strong>{" "}
                {booking.numberOfTicketsBooked || 0}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                ${booking.totalPrice?.toFixed(2) || "0.00"}
              </p>
              <p>
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
                  onClick={() => {
                    setBookingToCancel(booking._id);
                    setShowDialog(true);
                  }}
                  disabled={booking.bookingStatus === "canceled"}
                >
                  {booking.bookingStatus === "canceled"
                    ? "Cancelled"
                    : "Cancel Booking"}
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

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to cancel this booking?"
          onConfirm={handleConfirmCancel}
          onCancel={() => {
            setShowDialog(false);
            setBookingToCancel(null);
          }}
        />
      )}
    </div>
  );
};

export default UserBookingsPage;
