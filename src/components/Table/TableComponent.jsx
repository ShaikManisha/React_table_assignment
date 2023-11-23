import React, { useState, useEffect } from "react";
import "./table.css";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import AddModal from "../AddModal/AddModal";
import toast from "react-hot-toast";

const TableComponent = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    age: "",
    city: "",
    pinCode: "",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.value || "";
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      if (response.status === 200) {
        setTableData(response.data);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const response = await axios.post("http://localhost:3000/data", newData);
      if (response.status === 201) {
        toast.success("Data added to db.json");
        setShowAddModal(false);
        fetchData(); // Update the data from the server
      } else {
        toast.error("Failed to add data to db.json");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedRow || !selectedRow.id) {
      toast.error("Selected row or its ID is undefined");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/data/${selectedRow.id}`,
        editedData
      );
      if (response.status === 200) {
        toast.success("Data updated in db.json");
        setShowEditModal(false);
        fetchData(); // Update the data from the server
      } else {
        toast.error("Failed to update data in db.json");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/data/${deleteId}`
      );
      if (response.status === 200) {
        toast.success("Data deleted from db.json");
        setShowDeleteModal(false);
        setTableData((prevTableData) =>
          prevTableData.filter((row) => row.id !== deleteId)
        );
      } else {
        toast.error("Failed to delete data from db.json");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const handleEdit = (rowData) => {
    setShowEditModal(true);
    setSelectedRow(rowData);
    setEditedData({
      name: rowData?.name || "",
      age: rowData?.age || "",
      city: rowData?.city || "",
      pinCode: rowData?.pinCode || "",
    });
  };

  const handleCreate = () => {
    setShowAddModal(true);
  };

  return (
    <>
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => handleCreate()}>Add</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          ) : (
            tableData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row?.name || "-"}</td>
                <td>{row?.age || "-"}</td>
                <td>{row?.city || "-"}</td>
                <td>{row?.pinCode || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(row)}>Edit</button>
                  <button onClick={() => handleDelete(row?.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showAddModal && (
        <AddModal
          showAddModal={showAddModal}
          handleAdd={handleAdd}
          setShowAddModal={setShowAddModal}
        />
      )}

      {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          editedData={editedData}
          handleChange={handleChange}
          handleSave={handleSave}
          setShowEditModal={setShowEditModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          confirmDelete={confirmDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};

export default TableComponent;
