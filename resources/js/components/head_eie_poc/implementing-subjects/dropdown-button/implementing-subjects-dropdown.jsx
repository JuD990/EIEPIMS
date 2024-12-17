import React, { useState } from "react";
import "./implementing-subjects-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const ImplementingSubjectDropdown = () => {
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("BSIT");

  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
  const [selectedYearLevel, setSelectedYearLevel] = useState("1st Year");

  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("1st Semester");

  const programs = ["BSIT", "BSCS", "BLIS", "ACT"];
  const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["1st Semester", "2nd Semester"];

  return (
    <div
      className="eie-head-dropdown-container"
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {/* Program Dropdown */}
      <div className="eie-head-dropdown-wrapper">
        <button
          className="eie-head-dropdown-btn"
          onClick={() => setIsProgramOpen((prev) => !prev)}
        >
          {selectedProgram}
          <FaChevronDown className={`eie-head-dropdown-arrow ${isProgramOpen ? "open" : ""}`} />
        </button>
        {isProgramOpen && (
          <div className="eie-head-dropdown-menu">
            {programs.map((program, index) => (
              <p
                key={index}
                className={`eie-head-dropdown-item ${selectedProgram === program ? "eie-head-selected" : ""}`}
                onClick={() => {
                  setSelectedProgram(program);
                  setIsProgramOpen(false);
                }}
              >
                {program}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Year Level Dropdown */}
      <div className="eie-head-dropdown-wrapper">
        <button
          className="eie-head-dropdown-btn"
          onClick={() => setIsYearLevelOpen((prev) => !prev)}
        >
          {selectedYearLevel}
          <FaChevronDown className={`eie-head-dropdown-arrow ${isYearLevelOpen ? "open" : ""}`} />
        </button>
        {isYearLevelOpen && (
          <div className="eie-head-dropdown-menu">
            {yearLevels.map((level, index) => (
              <p
                key={index}
                className={`eie-head-dropdown-item ${selectedYearLevel === level ? "eie-head-selected" : ""}`}
                onClick={() => {
                  setSelectedYearLevel(level);
                  setIsYearLevelOpen(false);
                }}
              >
                {level}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Semester Dropdown */}
      <div className="eie-head-dropdown-wrapper">
        <button
          className="eie-head-dropdown-btn"
          onClick={() => setIsSemesterOpen((prev) => !prev)}
        >
          {selectedSemester}
          <FaChevronDown className={`eie-head-dropdown-arrow ${isSemesterOpen ? "open" : ""}`} />
        </button>
        {isSemesterOpen && (
          <div className="eie-head-dropdown-menu">
            {semesters.map((semester, index) => (
              <p
                key={index}
                className={`eie-head-dropdown-item ${selectedSemester === semester ? "eie-head-selected" : ""}`}
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

export default ImplementingSubjectDropdown;
