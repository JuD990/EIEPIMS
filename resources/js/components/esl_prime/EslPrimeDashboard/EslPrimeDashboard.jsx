import React from 'react';
import SidebarDashboard from '../sidebar/sidebarDashboard';
import "./EslPrimeDashboard.css"
import UserInfo from "../user_info/User-info";
const EslPrimeDashboard = () => {
  return (
    <div className="dashboard-container">
      <SidebarDashboard />
      <UserInfo />
      <div className="dashboard-content">
        <div className="dashboard-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default EslPrimeDashboard;
