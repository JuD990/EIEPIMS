import React, { useState } from "react";
import "./esl-prime-account-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const UserManagementDropdown = ({ searchQuery, setSearchQuery }) => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("Student");
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Studies");

  return (
    <div className="student-dropdown-container" style={{ display: 'flex', alignItems: 'center' }}>
    <div className="dropdowns-wrapper" style={{ display: 'flex', gap: '20px' }}>
    <div className="student-dropdown-wrapper">
    <button className="student-dropdown-btn" onClick={() => setIsUserTypeOpen((prev) => !prev)}>
    {selectedUserType}
    </button>
    </div>
    <div className="student-dropdown-wrapper">
    <button className="student-dropdown-btn" onClick={() => setIsDepartmentOpen((prev) => !prev)}>
    {selectedDepartment}
    </button>
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

