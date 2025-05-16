import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Log in</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" required autoComplete="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
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
