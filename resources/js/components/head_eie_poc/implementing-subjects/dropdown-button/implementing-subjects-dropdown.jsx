import React, { useState, useEffect } from "react";
import axios from "axios";  // Import Axios
import "./implementing-subjects-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const ImplementingSubjectDropdown = () => {
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(""); // Removed default "BSIT"

  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
  const [selectedYearLevel, setSelectedYearLevel] = useState(""); // Removed default "1st Year"

  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(""); // Removed default "1st Semester"

  const [programs, setPrograms] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeId = localStorage.getItem("employee_id");
        if (!employeeId) {
          console.error("Employee ID not found in localStorage");
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/implementing-subjects/specific-dropdown`, {
          params: { employee_id: employeeId }
        });

        if (response.status === 200) {
          const data = response.data;

          setPrograms(data.programs || []);
          setYearLevels(data.year_levels || []);
          setSemesters(data.semesters || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


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
    {selectedProgram || "Select Program"}
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
    {selectedYearLevel || "Select Year Level"} {/* Display default text if no year level selected */}
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
    {selectedSemester || "Select Semester"} {/* Display default text if no semester selected */}
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
