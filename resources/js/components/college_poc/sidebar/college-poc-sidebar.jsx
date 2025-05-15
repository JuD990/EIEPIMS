import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./college-poc-sidebar.css";
import logo from "@assets/system-logo.png";
import classicon from "@assets/class-icon.png";
import reporticon from "@assets/report-icon.png";
import studentmanagementicon from "@assets/student-management.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import uncLogo from "@assets/unc-logo.png";

const CollegePOCSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="college-poc-dashboard-sidebar">
    <div className="college-poc-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <div className="title-container">
    <h1 className="title">
    <span className="eie-text">EIE</span>PIMS
    </h1>
    <p className="sub-title">PROGRAM IMPLEMENTATION <br /> MANAGEMENT SYSTEM</p>
    </div>
    </div>

    <div className="college-poc-pages">
    <button
    className={`college-poc-dashboard-sidebar-button ${
      location.pathname === "/college-poc-dashboard" ? "active" : ""
    }`}
    onClick={() => navigate("/college-poc-dashboard")}
    >
    <img src={dashboardiconwhite} alt="Dashboard icon" className="college-poc-dashboard-icon" />
    <p>Dashboard</p>
    </button>

    <button
    className={`college-poc-class-management-sidebar-button ${
      location.pathname.startsWith("/class-management") || location.pathname.startsWith("/epgf-scorecard") ? "active" : ""
    }`}
    onClick={() => navigate("/class-management")}
    >
    <img src={classicon} alt="Class icon" className="class-icon" />
    <p>Class Record</p>
    </button>

    <button
    className={`college-poc-eie-reporting-sidebar-button ${
      location.pathname === "/college-poc-eie-reporting" ? "active" : ""
    }`}
    onClick={() => navigate("/college-poc-eie-reporting")}
    >
    <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
    <p>EIE Reports</p>
    </button>

    <button
    className={`college-poc-student-management-sidebar-button ${
      location.pathname === "/college-poc-student-management" ? "active" : ""
    }`}
    onClick={() => navigate("/college-poc-student-management")}
    >
    <img src={studentmanagementicon} alt="Student Management icon" className="student-manage-icon" />
    <p>Student Management</p>
    </button>
    </div>

    {/* UNC Logo and University Name */}
    <div className="unc-branding">
    <img src={uncLogo} alt="UNC Logo" className="unc-logo" />
    <p className="unc-text">University of Nueva Caceres</p>
    </div>
    </div>
  );
};

export default CollegePOCSidebar;
