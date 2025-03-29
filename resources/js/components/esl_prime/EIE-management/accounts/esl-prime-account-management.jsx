import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from "@user-info/User-info";
import UserManagementDropdown from "./dropdown-button/esl-prime-account-management-dropdown";
import UserStudentTable from "./user-management-table/students-table/student-table";
import UserCollegePocTable from "./user-management-table/college-poc-table/college-poc-table";
import UserLeadPocTable from "./user-management-table/lead-poc-table/lead-poc-table";
import UserEieHeadPocTable from "./user-management-table/eie-head-poc-table/eie-head-poc-table";

const EslPrimeAccountManagement = () => {
    // Retrieve from localStorage or default to "Student"
    const [selectedUserType, setSelectedUserType] = useState(
        localStorage.getItem("selectedUserType") || "Student"
    );
    const [searchQuery, setSearchQuery] = useState("");

    // Update localStorage whenever selectedUserType changes
    useEffect(() => {
        localStorage.setItem("selectedUserType", selectedUserType);
    }, [selectedUserType]);

    // Function to render the correct table based on userType
    const renderTable = () => {
        switch (selectedUserType) {
            case "Student":
                return <UserStudentTable searchQuery={searchQuery} />;
            case "College POC":
                return <UserCollegePocTable searchQuery={searchQuery} />;
            case "Lead POC":
                return <UserLeadPocTable searchQuery={searchQuery} />;
            case "EIE Head POC":
                return <UserEieHeadPocTable searchQuery={searchQuery} />;
            default:
                return <UserStudentTable searchQuery={searchQuery} />;
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />

        {renderTable()} {/* Dynamically render table */}
        </div>
    );
};

export default EslPrimeAccountManagement;
