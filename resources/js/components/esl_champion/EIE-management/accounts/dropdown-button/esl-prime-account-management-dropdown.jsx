import React, { useState, useEffect } from "react";
import axios from "axios";
import "./esl-prime-account-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const UserManagementDropdown = ({
  selectedUserType,
  setSelectedUserType,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment
}) => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [localSelectedUserType, setLocalSelectedUserType] = useState("Student"); // Default to "Student"
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const userType = ["Student", "College POC", "Lead POC", "EIE Head POC", "ESL Admins"];

  // In your useEffect - remove setting the first department by default
  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/api/getDepartmentsOptionsForPOCs")
    .then((response) => {
      setDepartments(response.data);
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
  }, []);


  // Sync with parent state and localStorage when mounted
  useEffect(() => {
    const storedUserType = localStorage.getItem("selectedUserType") || "Student"; // Ensure fallback
    setLocalSelectedUserType(storedUserType);
    setSelectedUserType(storedUserType);
  }, [setSelectedUserType]);

  // Function to handle user type selection
  const handleUserTypeChange = (type) => {
    setLocalSelectedUserType(type);
    setSelectedUserType(type);
    localStorage.setItem("selectedUserType", type); // Save to localStorage
    setIsUserTypeOpen(false);
  };

  return (
    <div className="student-dropdown-container">
    <div className="dropdowns-wrapper" style={{ display: "flex", alignItems: "center" }}>
    {/* User Type Dropdown */}
    <div className="student-dropdown-wrapper">
    <button className="student-dropdown-btn" onClick={() => setIsUserTypeOpen((prev) => !prev)}>
    {localSelectedUserType || "Student"}
    <FaChevronDown className={`dropdown-arrow ${isUserTypeOpen ? "open" : ""}`} />
    </button>
    {isUserTypeOpen && (
      <div className="student-dropdown-menu">
      {userType.map((type, index) => (
        <p
        key={index}
        className={`student-dropdown-item ${localSelectedUserType === type ? "selected" : ""}`}
        onClick={() => handleUserTypeChange(type)}
        >
        {type}
        </p>
      ))}
      </div>
    )}
    </div>

    {/* Department Dropdown */}
    <div className="student-dropdown-wrapper" style={{ position: "relative" }}>
    <button className="student-dropdown-btn" onClick={() => setIsDepartmentOpen((prev) => !prev)}>
    {selectedDepartment || "Select Department"}
    <FaChevronDown className={`dropdown-arrow ${isDepartmentOpen ? "open" : ""}`} />
    </button>
    {isDepartmentOpen && (
      <div className="student-dropdown-menu">
      {departments.map((dept, index) => (
        <p
        key={index}
        className={`student-dropdown-item ${selectedDepartment === dept ? "selected" : ""}`}
        onClick={() => {
          setSelectedDepartment(dept);
          setIsDepartmentOpen(false);
        }}
        >
        {dept}
        </p>
      ))}
      </div>
    )}
    </div>

    {/* Reset Filter (non-button text) */}
    <p
    style={{
      cursor: "pointer",
      fontWeight: 500,
      color: "black",
      marginTop: "20px",
      textDecoration: 'underline',
      whiteSpace: 'nowrap',
    }}
    onClick={() => setSelectedDepartment("")}
    >
    Reset Filter
    </p>
    </div>

    {/* Search Bar */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: "476px",
      height: "60px",
      borderRadius: "8px",
      borderColor: "#333333",
      paddingLeft: "10px",
      fontSize: "16px",
      marginLeft: "auto",
      marginRight: "25px",
    }}
    />
    </div>
  );
};

export default UserManagementDropdown;
