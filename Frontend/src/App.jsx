import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      
      <div className="app-container">
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/bookings" element={<UserBookingsPage />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
    
          </Routes>
        </div>

        <Footer />
         <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
