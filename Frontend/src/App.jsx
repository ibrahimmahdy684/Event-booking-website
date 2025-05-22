import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import EventList from "./components/EventsComponents/EventList";
import EventDetails from "./components/EventsComponents/EventDetails";
import UserBookingsPage from "./components/BookingComponenets/UserBookingsPage";
import BookingDetails from "./components/BookingComponenets/BookingDetails";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import UnauthorizedPage from "./components/auth/UnauthorizedPage";
import AdminUsersPage from "./components/AdminComponents/AdminUsersPage";
import ForgetPassword from "./components/ForgetPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookTicketForm from "./components/BookingComponenets/BookTicketForm";
import EventForm from "./components/EventsComponents/EventForm";

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
            {/*protected routes for Organizer*/ }
            <Route
            path="/my-events/new"
            element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <EventForm/>
            </ProtectedRoute>
            }
            />
            <Route
            path="/my-events/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <EventForm/>
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
