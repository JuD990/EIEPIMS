import React from "react";
import SidebarDashboard from '../../sidebar/sidebarDashboard';
import UserInfo from "../../user_info/User-info";

const eslMonthlyChampions = () => {
return(
    <div>
      <SidebarDashboard />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Monthly Champions</h1>
          </div>
        </div>
      </div>
    </div>
    );
};

export default eslMonthlyChampions;