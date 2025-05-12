import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import "./graph-dropdown.css";
import apiService from "@services/apiServices";

const GraphDropdown = ({ selectedSchoolYear, setSelectedSchoolYear, selectedSemester, setSelectedSemester }) => {
    const [isSchoolYearOpen, setIsSchoolYearOpen] = useState(false);
    const [isSemesterOpen, setIsSemesterOpen] = useState(false);
    const [schoolYears, setSchoolYears] = useState([]);
    const semesters = ["1st Semester", "2nd Semester"];

    useEffect(() => {
        const fetchSchoolYears = async (currentMonth) => {
            try {
                const response = await axios.get("http://localhost:8000/api/getSchoolYears");
                const schoolYearList = response.data;
                setSchoolYears(schoolYearList);

                if (schoolYearList.length > 0) {
                    const selectedYear = schoolYearList[0];
                    setSelectedSchoolYear(selectedYear);

                    // Set default semester only if it hasn't been selected by the user yet
                    if (!selectedSemester) {
                        const startYear = parseInt(selectedYear.split('/')[0], 10);
                        if (currentMonth >= 8 && currentMonth <= 12) {
                            setSelectedSemester("1st Semester");
                        } else {
                            setSelectedSemester("2nd Semester");
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching school years:", error);
            }
        };

        const currentMonth = new Date().getMonth() + 1;
        fetchSchoolYears(currentMonth);
    }, [setSelectedSchoolYear, setSelectedSemester, selectedSemester]);

    const handleSchoolYearSelect = (year) => {
        setSelectedSchoolYear(year);
        setIsSchoolYearOpen(false);
    };

    const handleSemesterSelect = (sem) => {
        setSelectedSemester(sem);
        setIsSemesterOpen(false);
    };

    // Safe check for selectedSchoolYear
    const formattedSchoolYear = selectedSchoolYear ? selectedSchoolYear.replace("/", "-") : "Select School Year";

    return (
        <div className="eie-head-graph-controls">
        <div className="eie-head-graph-dropdown-container">
        {/* School Year Dropdown */}
        <div className="eie-head-graph-dropdown-wrapper">
        <button
        className="eie-head-graph-dropdown-btn"
        onClick={() => setIsSchoolYearOpen((prev) => !prev)}
        >
        {formattedSchoolYear}
        <FaChevronDown
        className={`eie-head-graph-dropdown-arrow ${isSchoolYearOpen ? "open" : ""}`}
        />
        </button>
        {isSchoolYearOpen && (
            <div className="eie-head-graph-dropdown-menu">
            {schoolYears.length > 0 ? (
                schoolYears.map((year, index) => (
                    <p
                    key={index}
                    className={`eie-head-graph-dropdown-item ${
                        selectedSchoolYear === year ? "eie-head-graph-selected" : ""
                    }`}
                    onClick={() => handleSchoolYearSelect(year)}
                    >
                    {year.replace("/", "-")}
                    </p>
                ))
            ) : (
                <p className="eie-head-graph-dropdown-item">No School Years</p>
            )}
            </div>
        )}
        </div>

        {/* Semester Dropdown */}
        <div className="eie-head-graph-dropdown-wrapper">
        <button
        className="eie-head-graph-dropdown-btn"
        onClick={() => setIsSemesterOpen((prev) => !prev)}
        >
        {selectedSemester}
        <FaChevronDown
        className={`eie-head-graph-dropdown-arrow ${isSemesterOpen ? "open" : ""}`}
        />
        </button>
        {isSemesterOpen && (
            <div className="eie-head-graph-dropdown-menu">
            {semesters.map((sem, index) => (
                <p
                key={index}
                className={`eie-head-graph-dropdown-item ${
                    selectedSemester === sem ? "eie-head-graph-selected" : ""
                }`}
                onClick={() => handleSemesterSelect(sem)}
                >
                {sem}
                </p>
            ))}
            </div>
        )}
        </div>
        </div>
        </div>
    );

};

export default GraphDropdown;
