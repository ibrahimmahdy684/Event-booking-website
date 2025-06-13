import React from "react";
import '../../styles/ConfirmationDialouge.css'
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <div className="dialog-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-btn">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
