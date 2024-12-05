import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebarEIEreporting.css";
import logo from "@assets/system-logo.png";
import classicon from "@assets/class-icon.png";
import reporticon from "@assets/report-icon.png";
import studentmanagementicon from "@assets/student-management.png";
import dashboardiconwhite from "@assets/dashboard-icon.png";

const sidebarEIEreporting = () => {
  const navigate = useNavigate();

  const handleClassManagementClick = () => {
    navigate('/class-management');
  };
  const handleDashboardClick = () => {
    navigate("/college-poc-dashboard");
  };
  const handleStudentManagementClick = () => {
    navigate('/college-poc-student-management');
  };
  const handleEieReportingClick = () => {
    navigate('/college-poc-eie-reporting');
  };

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-logo-title">
        <img src={logo} alt="EIEPIMS Logo" className="logo" />
        <h1 className="title">EIEPIMS</h1>
      </div>
      <br /><br /><br /><br />
      <div className="collegepoc-pages">
        <button className="dasboard-sidebar-button" onClick={handleDashboardClick}>
          <div className="dasboard">
            <img src={dashboardiconwhite} alt="Dashboard icon" className="dashboard-icon" />
            <p>Dashboard</p>
          </div>
        </button>
        <button className="class-management-sidebar-button" onClick={handleClassManagementClick}>
          <div className="class-management">
            <img src={classicon} alt="Class management icon" className="class-icon" />
            <p>Class Management</p>
          </div>
        </button>
        <button className="eie-reporting-sidebar-button" onClick={handleEieReportingClick}>
          <div className="eie-reporting">
            <img src={reporticon} alt="EIE reporting icon" className="report-icon" />
            <p>EIE Reporting</p>
          </div>
        </button>
        <button className="student-management-sidebar-button" onClick={handleStudentManagementClick}>
          <div className="student-management">
            <img src={studentmanagementicon} alt="Student management icon" className="student-icon" />
            <p>Student Management</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default sidebarEIEreporting;
