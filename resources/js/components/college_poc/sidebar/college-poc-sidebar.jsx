import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./college-poc-sidebar.css";
import logo from "@assets/system-logo.png";
import classicon from "@assets/class-icon.png";
import reporticon from "@assets/report-icon.png";
import studentmanagementicon from "@assets/student-management.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";

const collegePOCsidebar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/college-poc-dashboard");
  };
  const handleEieReportingClick = () => {
    navigate('/college-poc-eie-reporting');
  };
  const handleStudentManagementClick = () => {
    navigate('/college-poc-student-management');
  };
  const handleClassManagementClick = () => {
    navigate('/class-management');
  };

  return (
    <div className="college-poc-dashboard-sidebar">
      <div className="college-poc-dashboard-logo-title">
        <img src={logo} alt="EIEPIMS Logo" className="logo" />
        <h1 className="title">EIEPIMS</h1>
      </div>

      <div className="college-poc-pages">
      <button className="college-poc-dashboard-sidebar-button" onClick={handleDashboardClick}>
        <img src={dashboardiconwhite} alt="Dashboard icon" className="college-poc-dashboard-icon" />
        <p>Dashboard</p>
      </button>

      <button className="college-poc-class-management-sidebar-button" onClick={handleClassManagementClick}>
        <img src={classicon} alt="Class icon" className="class-icon" />
        <p>Class Management</p>
      </button>

      <button className="college-poc-eie-reporting-sidebar-button" onClick={handleEieReportingClick}>
        <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
        <p>EIE Reporting</p>
      </button>

      <button className="college-poc-student-management-sidebar-button" onClick={handleStudentManagementClick}>
        <img src={studentmanagementicon} alt="Student Management icon" className="student-manage-icon" />
        <p>Student Management</p>
      </button>
      </div>
    </div>
  );
};

export default collegePOCsidebar;
