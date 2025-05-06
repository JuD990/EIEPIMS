import React, { useState } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const MasterClassList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);

  // Handle title and code selection change
  const handleTitleChange = (title) => {
    setSelectedTitle(title);
  };

  const handleCodeChange = (code) => {
    setSelectedCode(code);
  };

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>
    Master Class List
    </h1>

    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '20px 35px',
      width: '100%',
    }}>
    <StudentManagementDropdown
    selectedTitle={selectedTitle}
    onTitleChange={handleTitleChange}
    selectedCode={selectedCode}
    onCodeChange={handleCodeChange}
    />
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

    <StudentManagementTable
    searchQuery={searchQuery}
    selectedTitle={selectedTitle}
    selectedCode={selectedCode}
    />
    <br />
    </div>
  );
};

export default MasterClassList;
