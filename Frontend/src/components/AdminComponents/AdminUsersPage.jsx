// src/components/AdminUsersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to load users.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleUpdateRole = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/${id}`,
        {}, // or send new role if needed
        { withCredentials: true }
      );
      toast.success("Role updated");
      fetchUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="admin-page">
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
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
