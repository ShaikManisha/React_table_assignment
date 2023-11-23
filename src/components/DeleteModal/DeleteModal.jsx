import React from "react";

const DeleteModal = ({
  showDeleteModal,
  confirmDelete,
  setShowDeleteModal,
}) => {
  return (
    <div className={`modal ${showDeleteModal ? "active" : ""}`}>
      <div className="modal-content">
        <h2>Delete Data</h2>
        <p>Are you sure you want to delete?</p>
        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        <button type="button" onClick={confirmDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
