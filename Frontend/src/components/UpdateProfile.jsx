import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/Profile.css";

const UpdateProfile = () => {
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    profilePicture: null,
  });
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/profile", {
          withCredentials: true,
        });
        if (res.data) {
          setEditForm({
            name: res.data.name || "",
            email: res.data.email || "",
            profilePicture: null,
          });

          // Set the profile image URL if it exists
          if (res.data.profilePicture) {
            setProfileImageUrl(
              `http://localhost:3000/uploads/${res.data.profilePicture}`
            );
          }
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setEditForm((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));

      // Create a preview URL for the selected image
      if (files[0]) {
        const previewUrl = URL.createObjectURL(files[0]);
        setProfileImageUrl(previewUrl);
      }
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("email", editForm.email);

      if (editForm.profilePicture) {
        formData.append("profilePicture", editForm.profilePicture);
      }

      const res = await axios.put(
        "http://localhost:3000/api/v1/users/profile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } else {
        toast.error("No user data returned from server.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Loading...</p>
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
              {editForm.name ? editForm.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>

        <form className="profile-edit-form" onSubmit={handleEditSubmit}>
          <div className="profile-edit-group">
            <label htmlFor="edit-name">Name</label>
            <input
              id="edit-name"
              name="name"
              type="text"
              value={editForm.name}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="profile-edit-group">
            <label htmlFor="edit-email">Email</label>
            <input
              id="edit-email"
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="profile-edit-group">
            <label htmlFor="edit-profilePicture" className="custom-file-label">
              Change Profile Picture
            </label>
            <input
              id="edit-profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleEditChange}
              style={{ display: "none" }}
            />
            {editForm.profilePicture && (
              <div className="file-name">{editForm.profilePicture.name}</div>
            )}
          </div>
          <div className="profile-edit-actions">
            <button type="submit" className="profile-save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="profile-cancel-btn"
              onClick={() => navigate("/profile")}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default UpdateProfile;
