import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import userIcon from "../assets/user-icon.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // method to logout
  const handleLogout = async () => {
    try {
      // call the logout api endpoint
      await axios.get("http://localhost:3000/api/v1/logout", { withCredentials: true });
      setUser(null); // user not authenticated
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h2>Evently</h2>
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
            <Link to="/profile">
              <img src={userIcon} alt="User Icon" className="user-icon" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
