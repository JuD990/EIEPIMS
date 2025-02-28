import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./esl-sidebar.css";
import logo from "@assets/system-logo.png";
import eiemanagementicon from "@assets/eie-management-icon.png";
import reporticon from "@assets/report-icon.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import eiediagnosticicon from "@assets/eie-diagnostic-icon.png";
import accountIcon from "@assets/Users.png";
import certificationIcon from "@assets/certification-icon.png";
import templateIcon from "@assets/Template.png";
import epgfVersionIcon from "@assets/epgf-version-icon.png";
import interviewIcon from "@assets/InterviewScorecard.png";
import diagnosticReportsIcon from "@assets/EIEDiagnosticReports.png";

const ESLSidebar = () => {
  const navigate = useNavigate();

  // State variables for toggling extra buttons
  const [showManagementButtons, setShowManagementButtons] = useState(true);
  const [showDiagnosticsButtons, setShowDiagnosticsButtons] = useState(false);

  // Handlers for navigation and state updates
  const handleDashboardClick = () => {
    navigate("/esl-prime-dashboard");
    setShowManagementButtons(false); // Hide management buttons
    setShowDiagnosticsButtons(false); // Hide diagnostics buttons
  };

  const handleEieDiagnosticsClick = () => {
    setShowDiagnosticsButtons(true); // Show diagnostics buttons
    setShowManagementButtons(false); // Hide management buttons
  };

  const handleEieReportingClick = () => {
    navigate("/esl-eie-reporting");
    setShowManagementButtons(false); // Hide management buttons
    setShowDiagnosticsButtons(false); // Hide diagnostics buttons
  };

  const handleEpgfVersioningClick = () => {
    navigate("/esl-epgf-versioning");
  };

  const handleEslCertificationClick = () => {
    navigate("/esl-certification");
  };

  const handleEslMonthlyChampsClick = () => {
    navigate("/esl-template");
  };

  const handleEslAccountsClick = () => {
    navigate("/esl-account-management");
  };

  const handleEslInterviewScorecardClick = () => {
    navigate("/esl-interview-scorecard");
    setShowManagementButtons(false); // Hide management buttons
    setShowDiagnosticsButtons(true); // Show diagnostics buttons
  };

  const handleEslDiagnosticsReportsClick = () => {
    navigate("/esl-diagnostic-reports");
    setShowManagementButtons(false); // Hide management buttons
    setShowDiagnosticsButtons(true); // Show diagnostics buttons
  };

  return (
    <div className="esl-dashboard-sidebar">
    <div className="esl-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <h1 className="title">EIEPIMS</h1>
    </div>

    <div className="esl-prime-pages">
    {/* Dashboard Button */}
    <button className="esl-dashboard-sidebar-button" onClick={handleDashboardClick}>
    <img src={dashboardiconwhite} alt="Dashboard icon" className="esl-dashboard-icon" />
    <p>Dashboard</p>
    </button>

    {/* EIE Reporting Button */}
    <button className="esl-eie-reporting-sidebar-button" onClick={handleEieReportingClick}>
    <img src={reporticon} alt="EIE Reporting icon" className="class-icon" />
    <p>EIE Reporting</p>
    </button>

    {/* EIE Diagnostics Button */}
    <button className="esl-eie-diagnostic-sidebar-button" onClick={handleEieDiagnosticsClick}>
    <img src={eiediagnosticicon} alt="EIE Diagnostics icon" className="report-icon" />
    <p>EIE Diagnostics</p>
    </button>

    {/* Extra Buttons for EIE Diagnostics */}
    {showDiagnosticsButtons && (
      <div className="extra-buttons-container">
      <button className="interview-button" onClick={handleEslInterviewScorecardClick}>
      <img src={interviewIcon} alt="Interview Scorecard Icon" />
      <p>Interview Scorecard</p>
      </button>
      <button className="diagnosticReports-button" onClick={handleEslDiagnosticsReportsClick}>
      <img src={diagnosticReportsIcon} alt="Diagnostics Reports Icon" />
      <p>Diagnostics Reports</p>
      </button>
      </div>
    )}

    {/* EIE Management Button */}
    <button className="esl-eie-management-sidebar-button" onClick={() => setShowManagementButtons((prev) => !prev)}>
    <img src={eiemanagementicon} alt="EIE Management icon" className="student-icon" />
    <p>EIE Management</p>
    </button>

    {/* Extra Buttons for EIE Management */}
    {showManagementButtons && (
      <div className="extra-buttons-container">
      <button className="epgf-rubric-button" onClick={handleEpgfVersioningClick}>
      <img src={epgfVersionIcon} alt="EPGF Rubric Icon" />
      <p>EPGF Rubric</p>
      </button>
      <button className="certification-button" onClick={handleEslCertificationClick}>
      <img src={certificationIcon} alt="Certification Icon" />
      <p>Certification</p>
      </button>
      <button className="monthly-champions-button" onClick={handleEslMonthlyChampsClick}>
      <img src={templateIcon} alt="Template Icon" />
      <p>Template</p>
      </button>
      <button className="accounts-button" onClick={handleEslAccountsClick}>
      <img src={accountIcon} alt="Accounts Icon" />
      <p>Accounts</p>
      </button>
      </div>
    )}
    </div>
    </div>
  );
};

export default ESLSidebar;
