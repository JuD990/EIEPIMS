import React, { useState } from 'react';
import Sidebar from '../sidebar/college-poc-sidebar';
import UserInfo from '@user-info/User-info';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EPGFScorecard = () => {
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <UserInfo />
      <Sidebar />
      <br /><br /><br /><br /><br />
      <div className="student-management-page-title">
      <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#0187F1' }}>Student Management</h1>
      </div>
      <StudentManagementDropdown searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <br />
      <StudentManagementTable searchQuery={searchQuery} />
      <br />
    </div>
  );
};

export default EPGFScorecard;
