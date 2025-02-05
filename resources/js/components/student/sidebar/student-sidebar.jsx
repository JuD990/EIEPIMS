import React from "react";
import { useNavigate } from "react-router-dom";
import "./student-sidebar.css";
import logo from "@assets/system-logo.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/student-dashboard");
  };

  return (
    <div className="student-dashboard-sidebar">
    <div className="student-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <h1 className="title">EIEPIMS</h1>
    </div>

    <div className="student-pages">
    <button className="student-dashboard-sidebar-button" onClick={handleDashboardClick}>
    <img src={dashboardiconwhite} alt="Dashboard icon" className="student-dashboard-icon" />
    <p>Dashboard</p>
    </button>
    </div>
    </div>
  );
};

export default StudentSidebar;
