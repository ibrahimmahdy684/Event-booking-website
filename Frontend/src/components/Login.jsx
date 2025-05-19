import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../auth/AuthContext";

import "../styles/Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
