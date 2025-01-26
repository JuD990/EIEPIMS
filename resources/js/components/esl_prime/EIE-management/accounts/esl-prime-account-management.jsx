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
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '-60px' }}>User Management</h1>
          </div>
        </div>
      </div>
      <UserManagementDropdown/>
      <UserManagementTable />
      <UserManagementButtons/>
    </div>
    );
};

export default eslPrimeAccountManagement;
