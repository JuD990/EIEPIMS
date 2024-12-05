import React from "react";
import "./CollegePocDashboard.css";
import SidebarDashboard from "./sidebar/sidebarDashboard";
import UserInfo from "../user_info/User-info";

const CollegePocDashboard = () => {

  return (
    <div>
      <SidebarDashboard />
      <UserInfo />

      <br /><br /><br /><br /><br />
      <div className="dashboard-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Dashboard</h1>
      </div>

      
    </div>
  );
};

export default CollegePocDashboard;
