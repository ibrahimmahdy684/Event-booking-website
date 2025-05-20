import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = ({ user, onCancel, onProfileUpdated }) => {
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePicture: null,
  });
  const [saving, setSaving] = useState(false);

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setEditForm((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));
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
      const data = new FormData();
      data.append("name", editForm.name);
      data.append("email", editForm.email);
      if (editForm.profilePicture) {
        data.append("profilePicture", editForm.profilePicture);
      }
      const res = await axios.put("http://localhost:3000/api/v1/users/profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        onProfileUpdated(res.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("No user data returned from server.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
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
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
