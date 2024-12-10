import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eie-head-sidebar.css";
import logo from "@assets/system-logo.png";
import reporticon from "@assets/report-icon.png";
import studentmanagementicon from "@assets/student-management.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";
import implementingSubjectIcon from "@assets/implementing-subject-icon.png"
import masterClassListIcon from "@assets/master-class-list-icon.png"

const collegePOCsidebar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/eie-head-poc-dashboard");
  };
  const handleEieReportingClick = () => {
    navigate('/eie-head-reporting');
  };
  const handleStudentManagementClick = () => {
    navigate('/eie-head-student-management');
  };
  const handleMasterClassListClick = () => {
    navigate('/eie-head-master-class-list');
  };
  const handleImplementingSubjectsClick = () => {
    navigate('/implementing-subjects');
  };

  return (
    <div className="eie-head-dashboard-sidebar">
      <div className="eie-head-dashboard-logo-title">
        <img src={logo} alt="EIEPIMS Logo" className="logo" />
        <h1 className="title">EIEPIMS</h1>
      </div>

      <div className="eie-head-pages">
      <button className="eie-head-dashboard-sidebar-button" onClick={handleDashboardClick}>
        <img src={dashboardiconwhite} alt="Dashboard icon" className="eie-head-dashboard-icon" />
        <p>Dashboard</p>
      </button>

      <button className="eie-head-implementing-subject-sidebar-button" onClick={handleImplementingSubjectsClick}>
        <img src={implementingSubjectIcon} alt="Implementing icon" className="class-icon" />
        <p>Implementing Subjects</p>
      </button>

      <button className="eie-head-master-class-list-sidebar-button" onClick={handleMasterClassListClick}>
        <img src={masterClassListIcon} alt="Class list icon" className="master-class-icon" />
        <p>Master Class List</p>
      </button>

      <button className="eie-head-student-management-sidebar-button" onClick={handleStudentManagementClick}>
        <img src={studentmanagementicon} alt="Student Management icon" className="student-manage-icon" />
        <p>Student Management</p>
      </button>

      <button className="eie-head-eie-reporting-sidebar-button" onClick={handleEieReportingClick}>
        <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
        <p>EIE Reporting</p>
      </button>
      </div>
    </div>
  );
};

export default collegePOCsidebar;
