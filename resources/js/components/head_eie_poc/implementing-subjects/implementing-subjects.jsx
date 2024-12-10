import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '../user_info/User-info';
import ImplementingSubjectDropdown from "./dropdown-button/implementing-subjects-dropdown";
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
const EIEHeadStudentManagement = () => {

    return(
        <div>
        <EIEHeadSidebar/>
        <UserInfo/>
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-page-title">
            <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Implementing Subjects</h1>
            </div>
          </div>
        </div>
        <br />
        <ImplementingSubjectDropdown/>
        <br />
        <ImplementingSubjectsTable/>
        <br />
      </div>
    );
};

export default EIEHeadStudentManagement;