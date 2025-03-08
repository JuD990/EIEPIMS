import React, { useState } from "react";
import Sidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import UserManagementDropdown from "./dropdown-button/esl-prime-account-management-dropdown";
import UserStudentTable from "./user-management-table/students-table/student-table";
import UserCollegePocTable from "./user-management-table/college-poc-table/college-poc-table";
import UserLeadPocTable from "./user-management-table/lead-poc-table/lead-poc-table";
import UserEieHeadPocTable from "./user-management-table/eie-head-poc-table/eie-head-poc-table";
import UserManagementButtons from "./user-management-buttons/user-management-button";

const EslPrimeAccountManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUserType, setSelectedUserType] = useState("Student");

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
        <br /><br /><br /><br /><br />
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>
        User Management
        </h1>
        <UserManagementDropdown
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedUserType={setSelectedUserType} // Pass state setter
        />
        {renderTable()} {/* Dynamically render table */}
        <UserManagementButtons />
        </div>
    );
};

export default EslPrimeAccountManagement;
