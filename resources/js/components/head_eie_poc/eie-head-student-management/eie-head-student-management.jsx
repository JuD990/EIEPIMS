import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EIEHeadStudentManagement = () => {

    return(
        <div>
        <EIEHeadSidebar/>
        <UserInfo/>
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-page-title">
            <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Student Management</h1>
            </div>
          </div>
        </div>
        <StudentManagementDropdown/>
        <div style={{ position: 'relative', width: '100%' }}>
        <ExportButton label="Export" rightSpacing="34px" />
      </div>
      <br />
        <StudentManagementTable/>
        <br />
      </div>
    );
};

export default EIEHeadStudentManagement;
