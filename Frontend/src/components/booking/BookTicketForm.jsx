import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";

const BookTicketForm = ({ event }) => {
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!event) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    // Frontend check
    if (tickets > event.remainingTickets) {
      toast.error(`Only ${event.remainingTickets} tickets left`);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiBaseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://javascript-event-booking.onrender.com";

      const response = await axios.post(
        `${apiBaseUrl}/api/v1/bookings`,
        {
          eventId: event._id,
          numberOfTicketsBooked: tickets,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);

      const message = error.response?.data?.message;

      if (message?.toLowerCase().includes("not enough tickets")) {
        toast.error("Booking failed: Not enough tickets available");
      } else {
        toast.error(message || "Failed to book tickets");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {event.remainingTickets > 0 ? (
        <>
          <label className="block">
            <span className="text-gray-700">Number of Tickets:</span>
            <input
              type="number"
              min="1"
              max={event.remainingTickets}
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </>
      ) : (
        <p className="text-red-500 font-semibold">All tickets have been sold out.</p>
      )}
    </form>
  );
};

export default BookTicketForm;
