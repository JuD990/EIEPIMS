import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./student-sidebar.css";
import logo from "@assets/system-logo.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import uncLogo from "@assets/unc-logo.png";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Track the active page based on the route
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  // Handle navigation and set active state
  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
  };

  return (
    <div className="student-dashboard-sidebar-1">
    {/* Logo and Title section */}
    <div className="student-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <div className="title-container">
    <h1 className="title">
    <span className="eie-text">EIE</span>PIMS
    </h1>
    <p className="sub-title">PROGRAM IMPLEMENTATION <br /> MANAGEMENT SYSTEM</p>
    </div>
    </div>

    {/* Sidebar Buttons */}
    <div className="student-pages">
    {/* Dashboard */}
    <button
    className={`student-dashboard-sidebar-button-1 ${activePage === "/student-dashboard" ? "active" : ""}`}
    onClick={() => handleNavigation("/student-dashboard")}
    >
    <img src={dashboardiconwhite} alt="Dashboard icon" className="student-dashboard-icon" />
    <p>Dashboard</p>
    </button>
    </div>

    {/* UNC Logo and University Name (at the bottom) */}
    <div className="unc-branding">
    <img src={uncLogo} alt="UNC Logo" className="unc-logo" />
    <p className="unc-text">University of Nueva Caceres</p>
    </div>
    </div>
  );
};

export default StudentSidebar;
