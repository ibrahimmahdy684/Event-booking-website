import React from "react";

const UserRow = ({ user, onDelete, onUpdateRole }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={() => onUpdateRole(user._id)}>Update Role</button>
        <button onClick={() => onDelete(user._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
