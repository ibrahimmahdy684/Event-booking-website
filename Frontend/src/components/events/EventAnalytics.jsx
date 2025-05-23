import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import "../../styles/EventAnalytics.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const EventAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/users/events/analytics", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch(() => {
        toast.error("Failed to load analytics");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!analytics) return <p>No analytics data available</p>;

  // Prepare data for charts
  const {
    eventsByStatus,
    eventsByCategory,
    upcomingVsPastEvents,
    ticketsSoldAndRevenue,
    totalEvents,
  } = analytics;

  // Transform data for recharts PieChart
  const pieDataStatus = eventsByStatus.map(({ _id, count }) => ({
    name: _id || "Unknown",
    value: count,
  }));

  const pieDataCategory = eventsByCategory.map(({ _id, count }) => ({
    name: _id || "Uncategorized",
    value: count,
  }));

  const pieDataUpcomingPast = upcomingVsPastEvents.map(({ _id, count }) => ({
    name: _id,
    value: count,
  }));

  return (
    <div className="analytics-container">
      <h2>Event Analytics</h2>
      <div className="analytics-summary">
        <p>Total Events: {totalEvents}</p>
        <p>
          Total Tickets Sold: {ticketsSoldAndRevenue.totalTicketsSold} <br />
          Total Revenue: ${ticketsSoldAndRevenue.totalRevenue.toFixed(2)}
        </p>
      </div>
      <div className="analytics-charts">
        {/* Events by Status */}
        <div className="analytics-chart-card">
          <h3>Events by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieDataStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieDataStatus.map((entry, index) => (
                  <Cell
                    key={`cell-status-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Events by Category */}
        <div className="analytics-chart-card">
          <h3>Events by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieDataCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieDataCategory.map((entry, index) => (
                  <Cell key={`cell-cat-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming vs Past */}
        <div className="analytics-chart-card">
          <h3>Upcoming vs Past Events</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieDataUpcomingPast}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieDataUpcomingPast.map((entry, index) => (
                  <Cell key={`cell-upvp-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* You can also add bar charts or other charts here if you want */}
    </div>
  );
};

export default EventAnalytics;
