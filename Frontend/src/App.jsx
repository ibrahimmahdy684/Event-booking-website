import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<h1>Register Page</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
