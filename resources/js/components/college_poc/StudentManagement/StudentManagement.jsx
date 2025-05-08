import React, { useState } from 'react';
import Sidebar from '../sidebar/college-poc-sidebar';
import UserInfo from '@user-info/User-info';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EPGFScorecard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCode, setSelectedCode] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);

    const handleTitleChange = (title) => {
      setSelectedTitle(title);
    };

    const handleCodeChange = (code) => {
      setSelectedCode(code);
    };

  return (
    <div style={{ overflow: "hidden" }}>
      <UserInfo />
      <Sidebar />
      <br /><br /><br /><br />
      <div className="student-management-page-title">
      <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>Student Management</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Align dropdown to left & input to right
        alignItems: 'center',
        margin: '20px 35px',
        width: '100%',
      }}>
      <StudentManagementDropdown
      selectedCode={selectedCode}
      onCodeChange={handleCodeChange}
      selectedTitle={selectedTitle}
      onTitleChange={handleTitleChange}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery} />
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
      selectedCode={selectedCode}
      searchQuery={searchQuery}
      selectedTitle={selectedTitle}
      />
      <br />
    </div>
  );
};

export default EPGFScorecard;
