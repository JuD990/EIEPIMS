import React from "react";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from "../user_info/User-info"
import ImplementingSubjects from "./implementing-subjects/implementing-subject";
import "./CollegePocClassManagement.css"
import DashboardDropdown from "./dropdown-button/dashboard-dropdown";

const CollegePocImplementingSubjects = () => {


  return (
    <div>
      <CollegePOCsidebar />
      <UserInfo />
      <br /><br /><br /><br /><br />
      <div className="implementing-subject-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Class Management</h1>
      </div>
      <DashboardDropdown/>
      <ImplementingSubjects />
    </div>
  );
};

export default CollegePocImplementingSubjects;
