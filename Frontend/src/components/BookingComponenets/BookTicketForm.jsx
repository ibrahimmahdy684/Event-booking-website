import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookTicketForm = ({ event }) => {
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/v1/bookings",
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
      toast.error(error.response?.data?.message || "Failed to book tickets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
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
    </form>
  );
};

export default BookTicketForm;
