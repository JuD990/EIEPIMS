import React from 'react';
import UserInfo from "../user_info/User-info";
import "./StudentManagement.css"
import SidebarStudentManagement from './sidebar/sidebarStudentManagement';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EPGFScorecard = () => {
  return (
    <div>
      <UserInfo />
      <SidebarStudentManagement />
      <br /><br /><br /><br /><br />
      <div className="student-management-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Student Management</h1>
      </div>
      <br />
      <div style={{ position: 'relative', width: '100%' }}>
        <ExportButton label="Export" rightSpacing="50px" />
      </div>
      <StudentManagementDropdown/>
      <br />
      <StudentManagementTable />
      <br />
    </div>
  );
};

export default EPGFScorecard;
