import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebarDashboard.css";
import logo from "@assets/system-logo.png";
import eiemanagementicon from "@assets/eie-management-icon.png";
import reporticon from "@assets/report-icon.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import eiediagnosticicon from "@assets/eie-diagnostic-icon.png";

const SidebarDashboard = () => {
  const navigate = useNavigate();

  const handleEieDiagnosticsClick = () => {
    navigate('/esl-prime-eie-diagnostics');
  };
  const handleEieReportingClick = () => {
    navigate('/esl-prime-eie-reporting');
  };
  const handleEieManagementClick = () => {
    navigate('/esl-prime-eie-management');
  };

  return (
    <div className="esl-dashboard-sidebar">
      <div className="esl-dashboard-logo-title">
        <img src={logo} alt="EIEPIMS Logo" className="logo" />
        <h1 className="title">EIEPIMS</h1>
      </div>

      <div className="esl-prime-pages">
      <button className="esl-dashboard-sidebar-button">
        <img src={dashboardiconwhite} alt="Dashboard icon" className="esl-dashboard-icon" />
        <p>Dashboard</p>
      </button>

      <button className="esl-eie-reporting-sidebar-button" onClick={handleEieReportingClick}>
        <img src={reporticon} alt="EIE Reporting icon" className="class-icon" />
        <p>EIE Reporting</p>
      </button>

      <button className="esl-eie-diagnostic-sidebar-button" onClick={handleEieDiagnosticsClick}>
        <img src={eiediagnosticicon} alt="EIE Diagnostics icon" className="report-icon" />
        <p>EIE Diagnostics</p>
      </button>

      <button className="esl-eie-management-sidebar-button" onClick={handleEieManagementClick}>
        <img src={eiemanagementicon} alt="EIE Management icon" className="student-icon" />
        <p>EIE Management</p>
      </button>

      </div>
    </div>
  );
};

export default SidebarDashboard;
