import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialogue";

const UserRow = ({ user, onDelete, onUpdateRole }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    if (newRole !== user.role) {
      onUpdateRole(user._id, newRole);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(user._id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <select onChange={handleRoleChange} defaultValue={user.role}>
            <option value="Standard User">User</option>
            <option value="Organizer">Organizer</option>
            <option value="System Admin">Admin</option>
          </select>
        </td>
        <td>
          <button onClick={handleDeleteClick}>Delete</button>
        </td>
      </tr>

      {showConfirm && (
        <ConfirmationDialog
          message={`Are you sure you want to delete ${user.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default UserRow;
