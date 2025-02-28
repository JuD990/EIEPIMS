import React, { useState } from "react";
import "./esl-prime-account-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const UserManagementDropdown = () => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("Student");
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Studies");
  const [searchQuery, setSearchQuery] = useState("");

  const userType = ["Student", "College POC", "EIE Head POC"];
  const departments = ["Computer Studies", "Nursing", "Law", "Engineering and Architecture"];

  // Filter departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {selectedUserType}
            <FaChevronDown className={`dropdown-arrow ${isUserTypeOpen ? "open" : ""}`} />
          </button>
          {isUserTypeOpen && (
            <div className="student-dropdown-menu">
              {userType.map((type, index) => (
                <p
                  key={index}
                  className={`student-dropdown-item ${selectedUserType === type ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedUserType(type);
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
            {selectedDepartment}
            <FaChevronDown className={`dropdown-arrow ${isDepartmentOpen ? "open" : ""}`} />
          </button>
          {isDepartmentOpen && (
            <div className="student-dropdown-menu">
              {filteredDepartments.map((dept, index) => (
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
