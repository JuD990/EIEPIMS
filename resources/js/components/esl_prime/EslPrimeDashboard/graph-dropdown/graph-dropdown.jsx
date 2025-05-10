import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import "./graph-dropdown.css";
import apiService from "@services/apiServices";

const GraphDropdown = ({ setSelectedSchoolYear, setSelectedSemester }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSchoolYearOpen, setIsSchoolYearOpen] = useState(false);
    const [schoolYear, setSchoolYear] = useState("");
    const [isSemesterOpen, setIsSemesterOpen] = useState(false);
    const [semester, setSemester] = useState(""); // Default or selected semester
    const [schoolYears, setSchoolYears] = useState([]);
    const semesters = ["1st Semester", "2nd Semester"];

    const fetchSchoolYears = async (currentMonth) => {
        try {
            const response = await axios.get("http://localhost:8000/api/getSchoolYears");
            const schoolYearList = response.data;
            setSchoolYears(schoolYearList);

            if (schoolYearList.length > 0) {
                const selectedYear = schoolYearList[0];
                setSchoolYear(selectedYear);
                setSelectedSchoolYear(selectedYear);

                const startYear = parseInt(selectedYear.split('/')[0], 10);
                if (currentMonth >= 8 && currentMonth <= 12) {
                    setSemester("1st Semester");
                    setSelectedSemester("1st Semester");
                } else {
                    setSemester("2nd Semester");
                    setSelectedSemester("2nd Semester");
                }
            }
        } catch (error) {
            console.error("Error fetching school years:", error);
        }
    };

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        fetchSchoolYears(currentMonth); // Then fetch school years
    }, []);

    const handleSchoolYearSelect = (year) => {
        setSchoolYear(year);
        setSelectedSchoolYear(year);
        setIsSchoolYearOpen(false);
    };

    const handleSemesterSelect = (sem) => {
        setSemester(sem);
        setSelectedSemester(sem);
        setIsSemesterOpen(false);
    };

    const handleRefresh = async () => {
        setLoading(true); // Start the loading state
        setError(null); // Reset any previous error

        try {
            // Call API to refresh data
            const reportResponse = await apiService.post('/eie-reports/store-or-update');

            window.location.reload();  // Refreshes the page
        } catch (reportError) {
            console.error("Failed to update EIE Reports: ", reportError);
            setError('Failed to update reports');
        } finally {
            setLoading(false); // Ensure loading state is reset after the process completes
        }
    };

    const handleResetFilters = () => {
        if (schoolYears.length > 0) {
            const defaultYear = schoolYears[0];
            setSchoolYear(defaultYear);
            setSelectedSchoolYear(defaultYear);

            const currentMonth = new Date().getMonth() + 1;
            const defaultSemester = (currentMonth >= 8 && currentMonth <= 12) ? "1st Semester" : "2nd Semester";
            setSemester(defaultSemester);
            setSelectedSemester(defaultSemester);
        }
    };

    return (
        <div className="eie-head-graph-controls">
        <div className="eie-head-graph-dropdown-container">

        <div className="eie-head-reset-link-container">
        <a href="#" className="eie-head-reset-link" onClick={(e) => {
            e.preventDefault();
            handleResetFilters();
        }}>
        Reset Filters
        </a>
        </div>

        {/* School Year Dropdown */}
        <div className="eie-head-graph-dropdown-wrapper">
        <button
        className="eie-head-graph-dropdown-btn"
        onClick={() => setIsSchoolYearOpen((prev) => !prev)}
        >
        {schoolYear.replace("/", "-")}
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
                        schoolYear === year ? "eie-head-graph-selected" : ""
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
        {semester}
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
                    semester === sem ? "eie-head-graph-selected" : ""
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

        {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default GraphDropdown;
