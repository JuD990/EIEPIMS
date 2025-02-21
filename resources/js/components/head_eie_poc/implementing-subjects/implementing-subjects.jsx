import React, { useState } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";

const EIEHeadImplementingSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>Implementing Subjects</h1>
    <div style={{
      display: 'flex',
      flexDirection: 'column', // Stack the items vertically
      alignItems: 'flex-end', // Align items to the right
      margin: '20px 35px',
      gap: '10px', // Space between the button and the input
      width: '100%', // Make sure the container takes up the full width
    }}>
    {/* Uploading Button */}
    <UploadingButton onFileUpload={handleFileUpload} />

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
      borderColor: '#333333',
      paddingLeft: '10px',
      fontSize: '16px',
      marginRight: '55px'
    }}
    />
    </div>

    <ImplementingSubjectsTable searchQuery={searchQuery} />
    <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
