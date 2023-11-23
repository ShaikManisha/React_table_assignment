import React from "react";

const EditModal = ({
  showEditModal,
  editedData,
  handleChange,
  handleSave,
  setShowEditModal,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className={`modal ${showEditModal ? "active" : ""}`}>
      <div className="modal-content">
        <h2>Edit Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={editedData?.name ? editedData?.name : ""}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="input-row">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={editedData?.age ? editedData?.age : ""}
              onChange={(e) => handleChange(e, "age")}
            />
          </div>
          <div className="input-row">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={editedData?.city ? editedData?.city : ""}
              onChange={(e) => handleChange(e, "city")}
            />
          </div>
          <div className="input-row">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type=""
              id="pinCode"
              value={editedData?.pinCode ? editedData?.pinCode : ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  // Restrict to 6 digits
                  handleChange(e, "pinCode");
                }
              }}
            />
          </div>
          <div className="buttons-group">
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
