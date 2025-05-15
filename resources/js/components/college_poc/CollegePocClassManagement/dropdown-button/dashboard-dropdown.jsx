import React, { useState } from "react";
import "./dashboard-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const DashboardDropdown = () => {

  // State for Semester Dropdown
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("Semester");

  // Options for dropdowns
  const semesters = ["1st Semester", "2nd Semester"];

  return (
    <div className="dropdown-yearlevel-semester">

      {/* Semester Dropdown */}
      <div className="dropdown-semester">
        <button
          className="dropbtn"
          onClick={() => setIsSemesterOpen(!isSemesterOpen)}
        >
          {selectedSemester}
          <FaChevronDown
            className={`dropdown-icon ${isSemesterOpen ? "open" : ""}`}
          />
        </button>
        {isSemesterOpen && (
          <div className="dropdown-content-semester">
            {semesters.map((semester, index) => (
              <p
                key={index}
                className={`dropdown-option ${
                  selectedSemester === semester ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedSemester(semester);
                  setIsSemesterOpen(false);
                }}
              >
                {semester}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDropdown;
