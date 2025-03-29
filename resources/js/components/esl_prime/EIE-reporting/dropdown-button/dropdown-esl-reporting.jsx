import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";
import "./dropdown-esl-reporting.css";
import apiService from "@services/apiServices";

const ReportingDropdown = ({ setSelectedDepartment, setSelectedSchoolYear, setSelectedSemester }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [department, setDepartment] = useState("");
    const [isSchoolYearOpen, setIsSchoolYearOpen] = useState(false);
    const [schoolYear, setSchoolYear] = useState("");
    const [isSemesterOpen, setIsSemesterOpen] = useState(false);
    const [semester, setSemester] = useState("");
    const [departments, setDepartments] = useState([]);
    const [schoolYears, setSchoolYears] = useState([]);
    const semesters = ["1st Semester", "2nd Semester"];

    // Predefined departments and school years
    const predefinedDepartments = ["Department A", "Department B", "Department C"];
    const predefinedSchoolYears = ["2023/2024", "2024/2025"];

    useEffect(() => {
        // Simulate fetching departments and school years
        setDepartments(predefinedDepartments);
        setSchoolYears(predefinedSchoolYears);

        const currentMonth = new Date().getMonth() + 1;

        // Set initial selections
        if (predefinedDepartments.length > 0) {
            setDepartment(predefinedDepartments[0]);
            setSelectedDepartment(predefinedDepartments[0]);
        }

        if (predefinedSchoolYears.length > 0) {
            const selectedYear = predefinedSchoolYears[0];
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
    }, [setSelectedDepartment, setSelectedSchoolYear, setSelectedSemester]);

    const handleRefresh = async () => {
        setLoading(true); // Start the loading state
        setError(null); // Reset any previous error

        try {
            // Call API to refresh data
            const reportResponse = await apiService.post('/eie-reports/store-or-update');
            console.log("EIE Reports Updated: ", reportResponse.data);

            // Optional: Set some state to indicate successful refresh (if needed)
            // setData(reportResponse.data);
        } catch (reportError) {
            console.error("Failed to update EIE Reports: ", reportError);
            setError('Failed to update reports');
        } finally {
            setLoading(false); // Ensure loading state is reset after the process completes
        }
    };

    return (
        <div className="esl-dashboard-controls">
        <div className="esl-dashboard-dropdown-container">
        {/* Department Dropdown */}
        <div className="esl-dashboard-dropdown-wrapper">
        <button className="esl-dashboard-dropdown-btn" onClick={() => setIsDepartmentOpen((prev) => !prev)}>
        {department || "Select Department"}
        <FaChevronDown className={`esl-dashboard-dropdown-arrow ${isDepartmentOpen ? "open" : ""}`} />
        </button>
        {isDepartmentOpen && (
            <div className="esl-dashboard-dropdown-menu">
            {departments.length > 0 ? (
                departments.map((dept, index) => (
                    <p
                    key={index}
                    className={`esl-dashboard-dropdown-item ${department === dept ? "esl-dashboard-selected" : ""}`}
                    onClick={() => {
                        setDepartment(dept);
                        setSelectedDepartment(dept);
                        setIsDepartmentOpen(false);
                    }}
                    >
                    {dept}
                    </p>
                ))
            ) : (
                <p className="esl-dashboard-dropdown-item">No Departments</p>
            )}
            </div>
        )}
        </div>

        {/* School Year Dropdown */}
        <div className="esl-dashboard-dropdown-wrapper">
        <button className="esl-dashboard-dropdown-btn" onClick={() => setIsSchoolYearOpen((prev) => !prev)}>
        {schoolYear || "Select School Year"}
        <FaChevronDown className={`esl-dashboard-dropdown-arrow ${isSchoolYearOpen ? "open" : ""}`} />
        </button>
        {isSchoolYearOpen && (
            <div className="esl-dashboard-dropdown-menu">
            {schoolYears.length > 0 ? (
                schoolYears.map((year, index) => (
                    <p
                    key={index}
                    className={`esl-dashboard-dropdown-item ${schoolYear === year ? "esl-dashboard-selected" : ""}`}
                    onClick={() => {
                        setSchoolYear(year);
                        setSelectedSchoolYear(year);
                        setIsSchoolYearOpen(false);
                    }}
                    >
                    {year}
                    </p>
                ))
            ) : (
                <p className="esl-dashboard-dropdown-item">No School Years</p>
            )}
            </div>
        )}
        </div>

        {/* Semester Dropdown */}
        <div className="esl-dashboard-dropdown-wrapper">
        <button className="esl-dashboard-dropdown-btn" onClick={() => setIsSemesterOpen((prev) => !prev)}>
        {semester || "Select Semester"}
        <FaChevronDown className={`esl-dashboard-dropdown-arrow ${isSemesterOpen ? "open" : ""}`} />
        </button>
        {isSemesterOpen && (
            <div className="esl-dashboard-dropdown-menu">
            {semesters.map((sem, index) => (
                <p
                key={index}
                className={`esl-dashboard-dropdown-item ${semester === sem ? "esl-dashboard-selected" : ""}`}
                onClick={() => {
                    setSemester(sem);
                    setSelectedSemester(sem);
                    setIsSemesterOpen(false);
                }}
                >
                {sem}
                </p>
            ))}
            </div>
        )}
        </div>
        </div>

        <button
        className="esl-dashboard-refresh-btn"
        onClick={handleRefresh}
        disabled={loading}>
        <IoRefresh className="esl-dashboard-refresh-icon" />
        {loading ? 'Refreshing...' : 'Refresh'}
        </button>

        {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ReportingDropdown;

