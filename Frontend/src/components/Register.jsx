import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Form.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Standard User",
    profilePicture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setError("");
    setSuccess("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };
      //   if (form.profilePicture) {
      //     data.profilePicture = form.profilePicture;
      //   }

      const res = await axios.post("http://localhost:3000/api/v1/register", data, {
        withCredentials: true,
      });

      setSuccess("Registration successful");
      setTimeout(() => navigate("/login"), 1500);
      console.log(res);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="form-container" id="register-form-container">
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Sign up</h1>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>}
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
        {/*
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture (optional)</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePicture" className="custom-file-label">
            Choose file
          </label>
          {form.profilePicture && (
            <div className="file-name">{form.profilePicture.name}</div>
          )}
        </div>
        */}
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
        <div className="form-group">
          <label htmlFor="password">Password (min 8 characters)</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength={8}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
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
