import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/profile", {
          withCredentials: true,
        });
        if (res.data) {
          setUser(res.data);

          // Set the profile image URL if it exists
          if (res.data.profilePicture) {
            setProfileImageUrl(
              `http://localhost:3000/uploads/${res.data.profilePicture}`
            );
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <LoadingSpinner />
          <ToastContainer position="top-center" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <ToastContainer position="top-center" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-picture-container">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="profile-picture-preview"
            />
          ) : (
            <div className="profile-picture-placeholder">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div className="profile-role">{user.role}</div>
        <div className="profile-info">
          <div className="profile-field">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{user.name}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Joined:</span>
            <span className="profile-value">
              {user.timestamp ? new Date(user.timestamp).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
        <button className="profile-edit-btn" onClick={() => navigate("/updateProfile")}>
          Edit Profile
        </button>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Profile;
