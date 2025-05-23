import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../layout/LoadingSpinner";
import "../../styles/Form.css";

// SVG icons for eye/eye-off
const EyeIcon = ({ open }) =>
  open ? (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#757575"
        strokeWidth="2"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" stroke="#757575" strokeWidth="2" />
    </svg>
  ) : (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#757575"
        strokeWidth="2"
        d="M3 3l18 18M10.7 6.3A7.1 7.1 0 0 1 12 5c7 0 11 7 11 7a20.2 20.2 0 0 1-5.1 5.9M6.7 6.7A19.9 19.9 0 0 0 1 12s4 7 11 7c2.1 0 4-.4 5.7-1.1"
      />
      <path stroke="#757575" strokeWidth="2" d="M9.5 9.5a3 3 0 0 0 4 4" />
    </svg>
  );

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Standard User",
    profilePicture: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setForm((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      await axios.post("http://localhost:3000/api/v1/register", data, {
        withCredentials: true,
      });

      toast.success("Registration successful");
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="form-container" id="register-form-container">
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Sign up</h1>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        {/* Profile picture input can be added here if needed */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="Standard User">Standard User</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password (min 8 characters)</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              minLength={8}
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
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
        <div className="form-group password-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              minLength={8}
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowConfirm((prev) => !prev)}
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
        </div>
        <button type="submit" className="form-btn">
          Sign up
        </button>
        <div className="alt-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
