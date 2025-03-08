import React, { useState } from "react";
import ESLSidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";
import Dropdown from "./dropdown-button/implementing-subjects-dropdown";

const EIEHeadImplementingSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  return (
    <div>
    <ESLSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>Implementing Subjects</h1>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
      width: '100%',
    }}>
    {/* Uploading Button */}
    <UploadingButton onFileUpload={handleFileUpload} />

    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '430px'
    }}>
    {/* Dropdown */}
    <Dropdown />

    {/* Search Input */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      paddingLeft: '10px',
      fontSize: '16px',
      marginRight: '20px',
      border: '2px solid #6B6D76',
    }}
    />
    </div>
    </div>

    <ImplementingSubjectsTable searchQuery={searchQuery} />
    <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
