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
import UnauthorizedPage from "./components/UnauthorizedPage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import AdminUsersPage from "./components/AdminComponents/AdminUsersPage";
import ForgetPassword from "./components/ForgetPassword";

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

            <Route path="/profile" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />

            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="/bookings" element={<UserBookingsPage />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            {/* Protected routes */}
            {/*<Route
                path="/admin/users"
                element={
                  <ProtectedRoutes allowedRoles={['System Admin']}>
                    <AdminUsersPage />
                  </ProtectedRoutes>
                }
              />*/}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
