import React from 'react';
import "./StudentManagement.css"
import Sidebar from '../sidebar/college-poc-sidebar';
import UserInfo from '../../college_poc/user_info/User-info';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EPGFScorecard = () => {
  return (
    <div>
      <UserInfo />
      <Sidebar />
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
