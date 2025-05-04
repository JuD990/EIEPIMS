import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from "@user-info/User-info";
import UserManagementDropdown from "./dropdown-button/esl-prime-account-management-dropdown";
import UserStudentTable from "./user-management-table/students-table/student-table";
import UserCollegePocTable from "./user-management-table/college-poc-table/college-poc-table";
import UserLeadPocTable from "./user-management-table/lead-poc-table/lead-poc-table";
import UserEieHeadPocTable from "./user-management-table/eie-head-poc-table/eie-head-poc-table";
import UserEslAdminTable from "./user-management-table/esl-admins-table/esl-admins-table";

const EslPrimeAccountManagement = () => {
    // Retrieve from localStorage or default to "Student"
    const [selectedUserType, setSelectedUserType] = useState(
        localStorage.getItem("selectedUserType") || "Student"
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedYearLevel, setSelectedYearLevel] = useState("");

    // Update localStorage whenever selectedUserType changes
    useEffect(() => {
        localStorage.setItem("selectedUserType", selectedUserType);
    }, [selectedUserType]);

    // Function to render the correct table based on userType
    const renderTable = () => {
        const tableProps = {
            searchQuery,
            selectedUserType,
            selectedDepartment,
            selectedProgram,
            selectedYearLevel
        };

        switch (selectedUserType) {
            case "Student":
                return <UserStudentTable {...tableProps} />;
            case "College POC":
                return <UserCollegePocTable {...tableProps} />;
            case "Lead POC":
                return <UserLeadPocTable {...tableProps} />;
            case "EIE Head POC":
                return <UserEieHeadPocTable {...tableProps} />;
            case "ESL Admins":
                return <UserEslAdminTable {...tableProps} />;
            default:
                return <UserStudentTable {...tableProps} />;
        }
    };

    return (
        <div>
        <Sidebar />
        <UserInfo />
        <br /><br /><br /><br />
        <h1 style={{ fontFamily: "Epilogue", fontWeight: 800, marginLeft: "340px", color: "#383838" }}>
        User Management
        </h1>

        <UserManagementDropdown
        setSelectedUserType={setSelectedUserType}
        selectedUserType={selectedUserType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        selectedYearLevel={selectedYearLevel}
        setSelectedYearLevel={setSelectedYearLevel}
        />

        {renderTable()} {/* Dynamically render table */}
        </div>
    );
};

export default EslPrimeAccountManagement;
