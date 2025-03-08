import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./eie-head-sidebar.css";
import logo from "@assets/system-logo.png";
import reporticon from "@assets/report-icon.png";
import studentmanagementicon from "@assets/student-management.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import implementingSubjectIcon from "@assets/implementing-subject-icon.png";
import masterClassListIcon from "@assets/master-class-list-icon.png";
import uncLogo from "@assets/unc-logo.png";

const CollegePOCSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="eie-head-dashboard-sidebar">
    <div className="eie-head-dashboard-logo-title">
    <img src={logo} alt="EIEPIMS Logo" className="logo" />
    <div className="title-container">
    <h1 className="title">
    <span className="eie-text">EIE</span>PIMS
    </h1>
    <p className="sub-title">PROGRAM IMPLEMENTATION <br /> MANAGEMENT SYSTEM</p>
    </div>
    </div>

    <div className="eie-head-pages">
    <button
    className={`eie-head-dashboard-sidebar-button ${location.pathname === "/eie-head-poc-dashboard" ? "active" : ""}`}
    onClick={() => navigate("/eie-head-poc-dashboard")}
    >
    <img src={dashboardiconwhite} alt="Dashboard icon" className="eie-head-dashboard-icon" />
    <p>Dashboard</p>
    </button>

    <button
    className={`eie-head-implementing-subject-sidebar-button ${location.pathname === "/implementing-subjects" ? "active" : ""}`}
    onClick={() => navigate("/implementing-subjects")}
    >
    <img src={implementingSubjectIcon} alt="Implementing icon" className="class-icon" />
    <p>Implementing Subjects</p>
    </button>

    <button
    className={`eie-head-master-class-list-sidebar-button ${location.pathname === "/eie-head-master-class-list" ? "active" : ""}`}
    onClick={() => navigate("/eie-head-master-class-list")}
    >
    <img src={masterClassListIcon} alt="Class list icon" className="master-class-icon" />
    <p>Master Class List</p>
    </button>

    <button
    className={`eie-head-student-management-sidebar-button ${location.pathname === "/eie-head-student-management" ? "active" : ""}`}
    onClick={() => navigate("/eie-head-student-management")}
    >
    <img src={studentmanagementicon} alt="Student Management icon" className="student-manage-icon" />
    <p>Student Management</p>
    </button>

    <button
    className={`eie-head-eie-reporting-sidebar-button ${location.pathname === "/eie-head-reporting" ? "active" : ""}`}
    onClick={() => navigate("/eie-head-reporting")}
    >
    <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
    <p>EIE Reporting</p>
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
