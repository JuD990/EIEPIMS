import React, { useState } from "react";
import "./dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const CertificationDropdown = () => {
    // Semester Dropdown State
    const [isSemesterOpen, setIsSemesterOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState("1st Semester");

    // Months Dropdown State
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("August");

    // Department Dropdown State
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("SCIS");

    // Dropdown Options
    const semesters = ["1st Semester", "2nd Semester", "Summer"];
    const months = ["August", "September", "October", "November", "December"];
    const departments = ["SCIS", "Nursing", "Law", "Engineering and Architecture"];

    return (
        <div className="student-dropdown-container" style={{ display: "flex", alignItems: "center" }}>
        {/* Dropdowns Wrapper */}
        <div className="dropdowns-wrapper" style={{ display: "flex", gap: "20px" }}>

        {/* Semester Dropdown */}
        <div className="student-dropdown-wrapper">
        <button className="student-dropdown-btn" onClick={() => setIsSemesterOpen((prev) => !prev)}>
        {selectedSemester}
        <FaChevronDown className={`dropdown-arrow ${isSemesterOpen ? "open" : ""}`} />
        </button>
        {isSemesterOpen && (
            <div className="student-dropdown-menu">
            {semesters.map((semester, index) => (
                <p
                key={index}
                className={`student-dropdown-item ${selectedSemester === semester ? "selected" : ""}`}
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

        {/* Months Dropdown */}
        <div className="student-dropdown-wrapper">
        <button className="student-dropdown-btn" onClick={() => setIsMonthOpen((prev) => !prev)}>
        {selectedMonth}
        <FaChevronDown className={`dropdown-arrow ${isMonthOpen ? "open" : ""}`} />
        </button>
        {isMonthOpen && (
            <div className="student-dropdown-menu">
            {months.map((month, index) => (
                <p
                key={index}
                className={`student-dropdown-item ${selectedMonth === month ? "selected" : ""}`}
                onClick={() => {
                    setSelectedMonth(month);
                    setIsMonthOpen(false);
                }}
                >
                {month}
                </p>
            ))}
            </div>
        )}
        </div>

        {/* Department Dropdown */}
        <div className="student-dropdown-wrapper">
        <button className="student-dropdown-btn" onClick={() => setIsDepartmentOpen((prev) => !prev)}>
        {selectedDepartment}
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
        </div>
    );
};

export default CertificationDropdown;
