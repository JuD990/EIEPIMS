import React from "react";
import "./CollegePocDashboard.css";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from '@user-info/User-info';
const CollegePocDashboard = () => {

  return (
    <div>
      <CollegePOCsidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegePocDashboard;
