import React, { useState, useEffect } from "react";
import axios from "axios";
import "./esl-prime-account-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const UserManagementDropdown = ({ setSelectedUserType }) => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [localSelectedUserType, setLocalSelectedUserType] = useState("Student");
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState([]);

  const userType = ["Student", "College POC", "Lead POC", "EIE Head POC"];

  // Fetch departments from API
  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/api/getDepartmentsOptions")
    .then((response) => {
      setDepartments(response.data);
      setSelectedDepartment(response.data[0] || "");
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
  }, []);

  return (
    <div className="student-dropdown-container" style={{ display: 'flex', alignItems: 'center' }}>
    {/* Left side container for dropdowns */}
    <div className="dropdowns-wrapper" style={{ display: 'flex', gap: '20px' }}>
    {/* User Type Dropdown */}
    <div className="student-dropdown-wrapper">
    <button
    className="student-dropdown-btn"
    onClick={() => setIsUserTypeOpen((prev) => !prev)}
    >
    {localSelectedUserType}
    <FaChevronDown className={`dropdown-arrow ${isUserTypeOpen ? "open" : ""}`} />
    </button>
    {isUserTypeOpen && (
      <div className="student-dropdown-menu">
      {userType.map((type, index) => (
        <p
        key={index}
        className={`student-dropdown-item ${localSelectedUserType === type ? "selected" : ""}`}
        onClick={() => {
          setLocalSelectedUserType(type);
          setSelectedUserType(type); // Update parent state
          setIsUserTypeOpen(false);
        }}
        >
        {type}
        </p>
      ))}
      </div>
    )}
    </div>

    {/* Department Dropdown */}
    <div className="student-dropdown-wrapper">
    <button
    className="student-dropdown-btn"
    onClick={() => setIsDepartmentOpen((prev) => !prev)}
    >
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
    </div>

    {/* Right side Search Area */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      borderColor: '#333333',
      paddingLeft: '10px',
      fontSize: '16px',
      marginLeft: 'auto',
      marginRight: '25px',
    }}
    />
    </div>
  );
};

export default UserManagementDropdown;
