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

    return (
        <div className="college-poc-graph-controls">
        <div className="college-poc-graph-dropdown-container">
        {/* School Year Dropdown */}
        <div className="college-poc-graph-dropdown-wrapper">
        <button
        className="college-poc-graph-dropdown-btn"
        onClick={() => setIsSchoolYearOpen((prev) => !prev)}
        >
        {schoolYear.replace("/", "-")}
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
                        schoolYear === year ? "college-poc-graph-selected" : ""
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
        {semester}
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
                    semester === sem ? "college-poc-graph-selected" : ""
                }`}
                onClick={() => handleSemesterSelect(sem)} // Close dropdown after selecting
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
