import React from "react";
import Sidebar from '../../sidebar/esl-sidebar';
import UserInfo from '../../user_info/User-info';
import "./esl-prime-account-management.css"

const eslPrimeAccountManagement = () => {
return(
    <div>
      <Sidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>User Management</h1>
          </div>
        </div>
      </div>
    </div>
    );
};

export default eslPrimeAccountManagement;