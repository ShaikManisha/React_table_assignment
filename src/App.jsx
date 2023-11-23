import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableComponent from "./components/Table/TableComponent";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="App">
      <Router>
        <h1>Table Dashboard</h1>
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" exact element={<TableComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
