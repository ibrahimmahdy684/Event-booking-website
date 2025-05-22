import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { useAuth } from "./auth/AuthContext";

import "../styles/Form.css";

// SVG icons for eye/eye-off
const EyeIcon = ({ open }) =>
  open ? (
    // Eye open SVG
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#757575"
        strokeWidth="2"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" stroke="#757575" strokeWidth="2" />
    </svg>
  ) : (
    // Eye closed SVG
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#757575"
        strokeWidth="2"
        d="M3 3l18 18M10.7 6.3A7.1 7.1 0 0 1 12 5c7 0 11 7 11 7a20.2 20.2 0 0 1-5.1 5.9M6.7 6.7A19.9 19.9 0 0 0 1 12s4 7 11 7c2.1 0 4-.4 5.7-1.1"
      />
      <path stroke="#757575" strokeWidth="2" d="M9.5 9.5a3 3 0 0 0 4 4" />
    </svg>
  );

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refreshing the page after form submission
    try {
      // call the login api from the backend
      const res = await axios.post(
        "http://localhost:3000/api/v1/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setUser(res.data.user); // set user (authenticated)
      localStorage.setItem("token", res.data.token); // save token
      navigate("/"); // redirect to home page

      console.log(res.data);
    } catch (err) {
      console.log(err);

      // Check if the backend sent a specific error message
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>
        <button type="submit" className="form-btn">
          Log in
        </button>
        <div className="form-links">
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>
        <div className="alt-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
