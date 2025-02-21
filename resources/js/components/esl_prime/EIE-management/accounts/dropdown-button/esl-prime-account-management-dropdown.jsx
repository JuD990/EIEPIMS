import React, { useState } from "react";
import "./esl-prime-account-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const UserManagementDropdown = ({ searchQuery, setSearchQuery }) => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("Students");

  // List of user types
  const userTypeOptions = ["Students", "EIE Head POC", "Lead POC", "College POC"];

  const toggleUserTypeDropdown = () => {
    setIsUserTypeOpen((prev) => !prev);
  };

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    setIsUserTypeOpen(false); // Close dropdown after selection
  };

  return (
    <div className="student-dropdown-container">
    <div className="dropdowns-wrapper">
    <div className="student-dropdown-wrapper">
    <button className="student-dropdown-btn" onClick={toggleUserTypeDropdown}>
    {selectedUserType} <FaChevronDown />
    </button>
    {isUserTypeOpen && (
      <div className="student-dropdown-menu">
      {userTypeOptions.map((option) => (
        <div
        key={option}
        className={`student-dropdown-item ${selectedUserType === option ? "selected" : ""}`}
        onClick={() => handleUserTypeSelect(option)}
        >
        {option}
        </div>
      ))}
      </div>
    )}
    </div>
    </div>

    {/* Search Input */}
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
