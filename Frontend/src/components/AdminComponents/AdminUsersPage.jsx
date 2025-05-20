// src/components/AdminUsersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch users on mount
  useEffect(() => {
    //if (!user || user.role !== "System Admin") {
    //navigate("/unauthorized"); // Redirect to unauthorized page
    // }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      });

      // Handle ANY valid response format:
      const receivedData = res.data;

      // Case 1: Direct array response (users = [...])
      if (Array.isArray(receivedData)) {
        setUsers(receivedData);
      }
      // Case 2: Nested object response ({ users: [...] })
      else if (receivedData?.users && Array.isArray(receivedData.users)) {
        setUsers(receivedData.users);
      }
      // Case 3: Empty or invalid response
      else {
        console.warn("Unexpected API response format:", receivedData);
        setUsers([]);
        toast.warning("Received users in unexpected format");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/${id}`,
        { newRole }, // or send new role if needed
        { withCredentials: true }
      );
      toast.success("Role updated");
      fetchUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h2>All Users</h2>
      <table style={{ color: "black" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onDelete={handleDelete}
              onUpdateRole={handleUpdateRole}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
