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

    return (
        <div className="college-poc-graph-controls">
        <div className="college-poc-graph-dropdown-container">
        {/* School Year Dropdown */}
        <div className="college-poc-graph-dropdown-wrapper">
        <button
        className="college-poc-graph-dropdown-btn"
        onClick={() => setIsSchoolYearOpen((prev) => !prev)}
        >
        {selectedSchoolYear.replace("/", "-")}
        <FaChevronDown
        className={`college-poc-graph-dropdown-arrow ${isSchoolYearOpen ? "open" : ""}`}
        />
        </button>
        {isSchoolYearOpen && (
            <div className="college-poc-graph-dropdown-menu">
            {schoolYears.length > 0 ? (
                schoolYears.map((year, index) => (
                    <p
                    key={index}
                    className={`college-poc-graph-dropdown-item ${
                        selectedSchoolYear === year ? "college-poc-graph-selected" : ""
                    }`}
                    onClick={() => handleSchoolYearSelect(year)}
                    >
                    {year.replace("/", "-")}
                    </p>
                ))
            ) : (
                <p className="college-poc-graph-dropdown-item">No School Years</p>
            )}
            </div>
        )}
        </div>

        {/* Semester Dropdown */}
        <div className="college-poc-graph-dropdown-wrapper">
        <button
        className="college-poc-graph-dropdown-btn"
        onClick={() => setIsSemesterOpen((prev) => !prev)}
        >
        {selectedSemester}
        <FaChevronDown
        className={`college-poc-graph-dropdown-arrow ${isSemesterOpen ? "open" : ""}`}
        />
        </button>
        {isSemesterOpen && (
            <div className="college-poc-graph-dropdown-menu">
            {semesters.map((sem, index) => (
                <p
                key={index}
                className={`college-poc-graph-dropdown-item ${
                    selectedSemester === sem ? "college-poc-graph-selected" : ""
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
