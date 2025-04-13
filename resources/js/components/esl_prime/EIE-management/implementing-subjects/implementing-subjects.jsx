import React, { useState } from "react";
import ESLSidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";
import Dropdown from "./dropdown-button/implementing-subjects-dropdown";

const EIEHeadImplementingSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown state lifted here
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

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
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Pass down state and setters to dropdown */}
    <Dropdown
    selectedProgram={selectedProgram}
    setSelectedProgram={setSelectedProgram}
    selectedYearLevel={selectedYearLevel}
    setSelectedYearLevel={setSelectedYearLevel}
    selectedSemester={selectedSemester}
    setSelectedSemester={setSelectedSemester}
    />

    <UploadingButton onFileUpload={handleFileUpload} />

    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '295px',
      borderRadius: '8px',
      fontSize: '16px',
      border: '2px solid #6B6D76',
    }}
    />
    </div>
    </div>

    {/* Pass dropdown selections to table */}
    <ImplementingSubjectsTable
    searchQuery={searchQuery}
    program={selectedProgram}
    yearLevel={selectedYearLevel}
    semester={selectedSemester}
    />
    <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
