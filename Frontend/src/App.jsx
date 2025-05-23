import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Login from "./components/forms/Login";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import Register from "./components/forms/Register";
import EventList from "./components/events/EventList";
import EventDetails from "./components/events/EventDetails";
import UserBookingsPage from "./components/booking/UserBookingsPage";
import BookingDetails from "./components/booking/BookingDetails";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";
import UnauthorizedPage from "./components/auth/UnauthorizedPage";
import AdminUsersPage from "./components/admin/AdminUsersPage";
import ForgetPassword from "./components/forms/ForgetPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookTicketForm from "./components/booking/BookTicketForm";
import EventForm from "./components/events/EventForm";
import MyEvents from "./components/events/MyEventsPage";
import AdminEventsPage from "./components/admin/AdminEventsPage";
import EventAnalytics from "./components/events/EventAnalytics";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected routes for authenticated users (all roles) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  allowedRoles={["Standard User", "System Admin", "Organizer"]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateProfile"
              element={
                <ProtectedRoute
                  allowedRoles={["Standard User", "System Admin", "Organizer"]}
                >
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            {/* Protected routes for Standard User */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute allowedRoles={["Standard User"]}>
                  <UserBookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings/:id"
              element={
                <ProtectedRoute allowedRoles={["Standard User"]}>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />
            {/*protected routes for Organizer*/}
            <Route
              path="/my-events/new"
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <EventForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events/:id/edit"
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <EventForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events"
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <MyEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events/analytics"
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <EventAnalytics />
                </ProtectedRoute>
              }
            />
            {/* Protected routes for System Admin */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["System Admin"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={["System Admin"]}>
                  <AdminEventsPage />
                </ProtectedRoute>
              }
            />
            {/* Public event routes */}
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
