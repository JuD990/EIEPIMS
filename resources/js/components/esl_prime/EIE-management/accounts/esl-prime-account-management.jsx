import React, { useState } from "react";
import Sidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import UserManagementDropdown from "./dropdown-button/esl-prime-account-management-dropdown";
import UserStudentTable from "./user-management-table/students-table/student-table";
import UserManagementButtons from "./user-management-buttons/user-management-button";

const eslPrimeAccountManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
return(
    <div>
      <Sidebar />
      <UserInfo />
          <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#0187F1' }}>User Management</h1>
<UserManagementDropdown searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UserStudentTable searchQuery={searchQuery}/>
      <UserManagementButtons/>
    </div>
    );
};

export default eslPrimeAccountManagement;
