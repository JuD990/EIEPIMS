import React from "react";
import Sidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import "./esl-prime-account-management.css"
import UserManagementDropdown from "./dropdown-button/esl-prime-account-management-dropdown";
import UserManagementTable from "./user-management-table/user-management-table";
import UserManagementButtons from "./user-management-buttons/user-management-button";

const eslPrimeAccountManagement = () => {
return(
    <div>
      <Sidebar />
      <UserInfo />
          <br/><br/><br/><br/><br/>
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '345px', color: '#0187F1' }}>User Management</h1>
      <UserManagementDropdown/>
      <UserManagementTable />
      <UserManagementButtons/>
    </div>
    );
};

export default eslPrimeAccountManagement;
