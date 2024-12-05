import React from "react";
import UserInfo from "../user_info/User-info"
import ImplementingSubjects from "./implementing-subjects/implementing-subject";
import SidebarImplementingSubjects from "./sidebar/sidebar-Imp-Sub"
import "./CollegePocClassManagement.css"
import DashboardDropdown from "./dropdown-button/dashboard-dropdown";

const CollegePocImplementingSubjects = () => {


  return (
    <div>
      <SidebarImplementingSubjects />
      <UserInfo />
      <br /><br /><br /><br /><br />
      <div className="implementing-subject-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Implementing Subjects</h1>
      </div>
      <DashboardDropdown/>
      <ImplementingSubjects />
    </div>
  );
};

export default CollegePocImplementingSubjects;
