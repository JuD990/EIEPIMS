import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dropdown-monthly-champs.css";
import { FaChevronDown } from "react-icons/fa";

const MonthlyChampsDropdown = ({
    selectedProgram,
    setSelectedProgram,
    selectedYearLevel,
    setSelectedYearLevel,
    selectedDepartment,
    setSelectedDepartment,
}) => {
    const [isProgramOpen, setIsProgramOpen] = useState(false);
    const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

    const [programs, setPrograms] = useState([]);
    const [yearLevels, setYearLevels] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/implementing-subjects/dropdown");
                if (response.status === 200) {
                    const data = response.data;
                    setPrograms(data.programs || []);
                    setYearLevels(data.year_levels || []);
                    setDepartments(data.departments || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleResetFilters = () => {
        setSelectedProgram("");
        setSelectedYearLevel("");
        setSelectedDepartment("");
    };

    return (
        <div className="esl-monthly-champ-dropdown-container" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Program Dropdown */}
        <div className="esl-monthly-champ-dropdown-wrapper">
        <button className="esl-monthly-champ-dropdown-btn" onClick={() => setIsProgramOpen(prev => !prev)}>
        {selectedProgram || "Select Program"}
        <FaChevronDown className={`esl-monthly-champ-dropdown-arrow ${isProgramOpen ? "open" : ""}`} />
        </button>
        {isProgramOpen && (
            <div className="esl-monthly-champ-dropdown-menu">
            {programs.map((program, index) => (
                <p
                key={index}
                className={`esl-monthly-champ-dropdown-item ${selectedProgram === program ? "esl-monthly-champ-selected" : ""}`}
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
        <div className="esl-monthly-champ-dropdown-wrapper">
        <button className="esl-monthly-champ-dropdown-btn" onClick={() => setIsYearLevelOpen(prev => !prev)}>
        {selectedYearLevel || "Select Year Level"}
        <FaChevronDown className={`esl-monthly-champ-dropdown-arrow ${isYearLevelOpen ? "open" : ""}`} />
        </button>
        {isYearLevelOpen && (
            <div className="esl-monthly-champ-dropdown-menu">
            {yearLevels.map((level, index) => (
                <p
                key={index}
                className={`esl-monthly-champ-dropdown-item ${selectedYearLevel === level ? "esl-monthly-champ-selected" : ""}`}
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

        {/* Department Dropdown */}
        <div className="esl-monthly-champ-dropdown-wrapper">
        <button className="esl-monthly-champ-dropdown-btn" onClick={() => setIsDepartmentOpen(prev => !prev)}>
        {selectedDepartment || "Select Department"}
        <FaChevronDown className={`esl-monthly-champ-dropdown-arrow ${isDepartmentOpen ? "open" : ""}`} />
        </button>
        {isDepartmentOpen && (
            <div className="esl-monthly-champ-dropdown-menu">
            {departments.map((department, index) => (
                <p
                key={index}
                className={`esl-monthly-champ-dropdown-item ${selectedDepartment === department ? "esl-monthly-champ-selected" : ""}`}
                onClick={() => {
                    setSelectedDepartment(department);
                    setIsDepartmentOpen(false);
                }}
                >
                {department}
                </p>
            ))}
            </div>
        )}
        </div>

        {/* Reset Filter Link */}
        <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            handleResetFilters();
        }}
        style={{
            textDecoration: "underline",
            color: "black",
            cursor: "pointer",
            fontSize: "16px",
            whiteSpace: "nowrap",
        }}
        >
        Reset Filter
        </a>
        </div>
    );
};

export default MonthlyChampsDropdown;
