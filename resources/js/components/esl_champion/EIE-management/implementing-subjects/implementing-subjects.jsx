import React, { useState } from "react";
import ESLSidebar from "../../sidebar/esl-sidebar";
import UserInfo from "@user-info/User-info";
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import ImplementingSubjectsArchiveTable from "./implementing-subjects-archive-table/implementing-subjects-archive-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";
import Dropdown from "./dropdown-button/implementing-subjects-dropdown";
import archiveLogo from "@assets/Archive.png";

const EIEHeadImplementingSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  const handleArchivedSubjectsButtonClick = () => {
    setShowArchived(true);
  };

  const handleBackToActiveSubjectsClick = () => {
    setShowArchived(false);
  };

  return (
    <div>
    <ESLSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />

    {/* Conditionally render the title based on showArchived */}
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>
    {showArchived ? 'Archived Implementing Subjects' : 'Implementing Subjects'}
    </h1>

    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Dropdown
    selectedProgram={selectedProgram}
    setSelectedProgram={setSelectedProgram}
    selectedYearLevel={selectedYearLevel}
    setSelectedYearLevel={setSelectedYearLevel}
    selectedSemester={selectedSemester}
    setSelectedSemester={setSelectedSemester}
    />

    {/* Toggle Button for Archived/Active Subjects */}
    <button
    onClick={() => setShowArchived(!showArchived)}
    className="esl-archived-subjects-button"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 18px",
      borderRadius: "6px",
      backgroundColor: "#6B6D76",
      color: "white",
      border: "none",
      whiteSpace: "nowrap",
    }}
    >
    {showArchived ? (
      <>
      <span className="archive-label">Back to Active Subjects</span>
      </>
    ) : (
      <>
      <img src={archiveLogo} alt="Archive Icon" className="archive-icon" />
      <span className="archive-label">Archived Subjects</span>
      </>
    )}
    </button>

    <UploadingButton
    onFileUpload={handleFileUpload}
    onArchiveClick={handleArchivedSubjectsButtonClick}
    />

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
      marginLeft: "-58px",
    }}
    />
    </div>
    </div>

    {showArchived ? (
      <ImplementingSubjectsArchiveTable
      searchQuery={searchQuery}
      program={selectedProgram}
      yearLevel={selectedYearLevel}
      semester={selectedSemester}
      />
    ) : (
      <ImplementingSubjectsTable
      searchQuery={searchQuery}
      program={selectedProgram}
      yearLevel={selectedYearLevel}
      semester={selectedSemester}
      />
    )}

    <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
