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
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>
    Implementing Subjects
    </h1>

    {/* Container for UploadingButton, Dropdown, and Search Input */}
    <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }}
    >

    <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
    {/* Dropdown */}
    <Dropdown />
    {/* Uploading Button */}
    <UploadingButton onFileUpload={handleFileUpload} />

    {/* Search Input */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '400px',
      borderRadius: '8px',
      fontSize: '16px',
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
