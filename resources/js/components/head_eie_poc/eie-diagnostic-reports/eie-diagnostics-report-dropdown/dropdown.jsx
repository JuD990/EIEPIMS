import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import "./dropdown.css";

const DiagnosticsDropdown = ({
    department,
    setDepartment,
    attendance,
    setAttendance,
    schoolYear,
    setSchoolYear,
    searchQuery,
    setSearchQuery, // Receive setSearchQuery as a prop
}) => {
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
    const [isSchoolYearOpen, setIsSchoolYearOpen] = useState(false);
    const attendanceOptions = ["Showed Up", "No Show"];
    const [schoolYearList, setSchoolYearList] = useState([]);

    useEffect(() => {
        const fetchDepartmentsAndUserDept = async () => {
            try {
                const employeeId = localStorage.getItem("employee_id");
                const userType = localStorage.getItem("userType");

                const [deptRes, userDeptRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/master-class-list-department"),
                                                                 axios.get(`http://localhost:8000/api/employee-department/${userType}/${employeeId}`)
                ]);

                const departmentList = Array.isArray(deptRes.data) ? deptRes.data : [];
                const userDepartment = userDeptRes.data?.department || null; // Adjust based on your API response

                setDepartments(departmentList);

                if (!department) {
                    const matchedDepartment = departmentList.find(dept => dept === userDepartment);
                    setDepartment(matchedDepartment || departmentList[0] || "");
                }
            } catch (error) {
                console.error("Error fetching departments or user department:", error);
            }
        };

        const fetchSchoolYears = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/master-class-list-school-year");
                const schoolYearList = response.data;
                setSchoolYearList(schoolYearList);

                if (schoolYearList.length > 0 && !schoolYear) {
                    setSchoolYear(schoolYearList[0]);
                }
            } catch (error) {
                console.error("Error fetching school years:", error);
            }
        };

        fetchDepartmentsAndUserDept();
        fetchSchoolYears();
    }, [department, schoolYear, setDepartment, setSchoolYear]);


    const filteredDepartments = departments.filter(dept => dept.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredSchoolYears = schoolYearList.filter(year => year.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="diagnostics-dropdown-controls">
        <div className="diagnostics-dropdown-container">

        {/* Attendance Dropdown */}
        <div className="diagnostics-dropdown-wrapper">
        <button className="diagnostics-dropdown-btn" onClick={() => setIsAttendanceOpen(prev => !prev)}>
        {attendance || "Select Attendance"}
        <FaChevronDown className={`diagnostics-dropdown-arrow ${isAttendanceOpen ? "open" : ""}`} />
        </button>
        {isAttendanceOpen && (
            <div className="diagnostics-dropdown-menu">
            {attendanceOptions.map((option, index) => (
                <p
                key={index}
                className={`diagnostics-dropdown-item ${attendance === option ? "diagnostics-dropdown-selected" : ""}`}
                onClick={() => {
                    setAttendance(option);
                    setIsAttendanceOpen(false);
                }}
                >
                {option}
                </p>
            ))}
            </div>
        )}
        </div>

        {/* School Year Dropdown */}
        <div className="diagnostics-dropdown-wrapper">
        <button className="diagnostics-dropdown-btn" onClick={() => setIsSchoolYearOpen(prev => !prev)}>
        {schoolYear || "Select School Year"}
        <FaChevronDown className={`diagnostics-dropdown-arrow ${isSchoolYearOpen ? "open" : ""}`} />
        </button>
        {isSchoolYearOpen && (
            <div className="diagnostics-dropdown-menu">
            {filteredSchoolYears.length > 0 ? (
                filteredSchoolYears.map((year, index) => (
                    <p
                    key={index}
                    className={`diagnostics-dropdown-item ${schoolYear === year ? "diagnostics-dropdown-selected" : ""}`}
                    onClick={() => {
                        setSchoolYear(year);
                        setIsSchoolYearOpen(false);
                    }}
                    >
                    {year}
                    </p>
                ))
            ) : (
                <p className="diagnostics-dropdown-item">No School Years</p>
            )}
            </div>
        )}
        </div>

        {/* Search Input */}
        <div className="diagnostics-search-input-container">
        <input
        type=""
        className="diagnostics-search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Use the passed setSearchQuery function
        />
        </div>
        </div>
        </div>
    );
};

export default DiagnosticsDropdown;
