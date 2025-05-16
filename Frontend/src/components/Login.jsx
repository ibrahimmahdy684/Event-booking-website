import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refreshing the page after form submission
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setUser(res.data.user);

      // Handle successful login
      //localStorage.setItem("token", response.data.token);
      //window.location.href = "/"; // redirect to home page

      console.log(res.data);
    } catch (err) {
      console.error("Login failed: " + err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
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
        <button type="submit" className="login-btn">
          Log in
        </button>
        <div className="login-links">
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>
        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
