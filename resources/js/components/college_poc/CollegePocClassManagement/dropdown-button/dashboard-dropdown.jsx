import React, { useState } from "react";
import "./dashboard-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const DashboardDropdown = () => {
  // State for Year Level Dropdown
  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
  const [selectedYearLevel, setSelectedYearLevel] = useState("Year Level");

  // State for Semester Dropdown
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("Semester");

  // Options for dropdowns
  const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["1st Semester", "2nd Semester"];

  return (
    <div className="dropdown-yearlevel-semester">
      {/* Year Level Dropdown */}
      <div className="dropdown-year-level">
        <button
          className="dropbtn"
          onClick={() => setIsYearLevelOpen(!isYearLevelOpen)}
        >
          {selectedYearLevel}
          <FaChevronDown
            className={`dropdown-icon ${isYearLevelOpen ? "open" : ""}`}
          />
        </button>
        {isYearLevelOpen && (
          <div className="dropdown-content-year-level">
            {yearLevels.map((year, index) => (
              <p
                key={index}
                className={`dropdown-option ${
                  selectedYearLevel === year ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedYearLevel(year);
                  setIsYearLevelOpen(false);
                }}
              >
                {year}
              </p>
            ))}
          </div>
        )}
      </div>

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
