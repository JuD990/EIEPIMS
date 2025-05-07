import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./lead-poc-sidebar.css";
import logo from "@assets/system-logo.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import uncLogo from "@assets/unc-logo.png";
import reporticon from "@assets/report-icon.png";

const LeadSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Track active page
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="student-dashboard-sidebar">
    {/* Logo and Title section */}
    <div className="student-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <div className="title-container">
    <h1 className="title">
    <span className="eie-text">EIE</span>PIMS
    </h1>
    <p className="sub-title">
    PROGRAM IMPLEMENTATION <br /> MANAGEMENT SYSTEM
    </p>
    </div>
    </div>

    {/* Sidebar Buttons */}
    <div className="student-pages">
    {/* Dashboard Button */}
    <button
    className={`student-dashboard-sidebar-button ${
      activePage === "/lead-eie-poc-dashboard" ? "active" : ""
    }`}
    onClick={() => navigate("/lead-eie-poc-dashboard")}
    >
    <img src={dashboardiconwhite} alt="Dashboard icon" className="student-dashboard-icon" />
    <p>Dashboard</p>
    </button>

    {/* EIE Reporting Button */}
    <button
    className={`student-reporting-sidebar-button ${
      activePage === "/lead-poc-reporting" ? "active" : ""
    }`}
    onClick={() => navigate("/lead-poc-reporting")}
    >
    <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
    <p>EIE Reports</p>
    </button>
    </div>

    {/* UNC Branding */}
    <div className="unc-branding">
    <img src={uncLogo} alt="UNC Logo" className="unc-logo" />
    <p className="unc-text">University of Nueva Caceres</p>
    </div>
    </div>
  );
};

export default LeadSidebar;
