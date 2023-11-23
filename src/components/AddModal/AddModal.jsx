import React, { useState } from "react";

const AddModal = ({ showAddModal, handleAdd, setShowAddModal }) => {
  const [newData, setNewData] = useState({
    name: "",
    age: "",
    city: "",
    pinCode: "",
  });

  const handleChange = (e, field) => {
    const value = e.target.value;

    setNewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    handleAdd(newData); // Trigger handleAdd function with new data
    setNewData({
      name: "",
      age: "",
      city: "",
      pinCode: "",
    });
    setShowAddModal(false); // Close the modal after saving
  };

  return (
    <div className={`modal ${showAddModal ? "active" : ""}`}>
      <div className="modal-content">
        <span
          className="close"
          onClick={() => setShowAddModal(false)}
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            cursor: "pointer",
          }}>
          &times;
        </span>
        <h2>Add New Entry</h2>
        <div className="input-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newData?.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </div>
        <div className="input-row">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={newData?.age}
            onChange={(e) => handleChange(e, "age")}
          />
        </div>
        <div className="input-row">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={newData?.city}
            onChange={(e) => handleChange(e, "city")}
          />
        </div>
        <div className="input-row">
          <label>Pincode:</label>
          <input
            type="text"
            value={newData?.pinCode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                // Restrict to 6 digits
                handleChange(e, "pinCode");
              }
            }}
          />
        </div>
        <button onClick={() => setShowAddModal(false)}>Cancel</button>
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default AddModal;
