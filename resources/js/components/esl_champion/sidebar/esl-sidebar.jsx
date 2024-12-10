import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./esl-sidebar.css";
import logo from "@assets/system-logo.png";
import eiemanagementicon from "@assets/eie-management-icon.png";
import reporticon from "@assets/report-icon.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import eiediagnosticicon from "@assets/eie-diagnostic-icon.png";
import accountIcon from "@assets/account-icon.png";
import certificationIcon from "@assets/certification-icon.png";
import monthlyChampsIcon from "@assets/monthly-champs-icon.png";
import epgfVersionIcon from "@assets/epgf-version-icon.png"

const ESLSidebar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/esl-dashboard');
  };
  const handleEieDiagnosticsClick = () => {
    navigate('/esl-eie-diagnostics');
  };
  const handleEieReportingClick = () => {
    navigate('/esl-eie-reporting');
  };
  const handleEpgfVersioningClick = () => {
    navigate('/esl-epgf-versioning');
  };
  const handleEslCertificationClick = () => {
    navigate('/esl-certification');
  };
  const handleEslMonthlyChampsClick = () => {
    navigate('/esl-monthly-champions');
  };
  const handleEslAccountsClick = () => {
    navigate('/esl-account-management');
  };
  
  // State to control the visibility of additional buttons
  const [showExtraButtons, setShowExtraButtons] = useState(true);

    // Handler for the button click
  const handleEieManagementButtons = () => {
    setShowExtraButtons((prev) => !prev); // Toggle the state
  };

  return (
    <div className="esl-dashboard-sidebar">
      <div className="esl-dashboard-logo-title">
        <img src={logo} alt="EIEPIMS Logo" className="logo" />
        <h1 className="title">EIEPIMS</h1>
      </div>

      <div className="esl-prime-pages">
      <button className="esl-dashboard-sidebar-button" onClick={handleDashboardClick}>
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

      <button className="esl-eie-management-sidebar-button" onClick={handleEieManagementButtons}>
        <img src={eiemanagementicon} alt="EIE Management icon" className="student-icon" />
        <p>EIE Management</p>
      </button>

            {/* Conditionally render the extra buttons */}
      {showExtraButtons && (
        <div className="extra-buttons-container">
          <button className="epgf-rubric-button" onClick={handleEpgfVersioningClick}>
            <img src={epgfVersionIcon} alt="" />
            <p>EPGF Rubric</p>
          </button>
          <button className="monthly-champions-button" onClick={handleEslMonthlyChampsClick}>
            <img src={monthlyChampsIcon} alt="" />
            <p>Monthly Champions</p>
          </button>
          <button className="certification-button" onClick={handleEslCertificationClick}>
            <img src={certificationIcon} alt="" />
            <p>Certification</p>
          </button>
          <button className="accounts-button" onClick={handleEslAccountsClick}>
            <img src={accountIcon} alt="" />
            <p>Accounts</p>
          </button>
        </div>
      )}

      </div>
    </div>
  );
};

export default ESLSidebar;
