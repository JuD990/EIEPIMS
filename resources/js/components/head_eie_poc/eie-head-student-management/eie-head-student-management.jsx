import React, { useState } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EIEHeadStudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>
    Student Management
    </h1>

    <div style={{
      display: 'flex',
      justifyContent: 'space-between', // Align dropdown to left & input to right
      alignItems: 'center',
      margin: '20px 35px',
      width: '100%',
    }}>
    <StudentManagementDropdown />
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      borderColor: '#333333',
      fontSize: '16px',
      marginRight: '70px'
    }}
    />
    </div>

    <StudentManagementTable searchQuery={searchQuery} />
    <br />
    </div>
  );
};

export default EIEHeadStudentManagement;
