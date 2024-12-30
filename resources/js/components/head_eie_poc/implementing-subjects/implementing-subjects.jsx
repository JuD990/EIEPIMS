import React, { useState } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import ImplementingSubjectDropdown from "./dropdown-button/implementing-subjects-dropdown";
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";

const EIEHeadImplementingSubjects = () => {
  // State to hold selected filter values
  const [selectedProgram, setSelectedProgram] = useState("BSIT");
  const [selectedYearLevel, setSelectedYearLevel] = useState("1st Year");
  const [selectedSemester, setSelectedSemester] = useState("1st Semester");

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
    // Add functionality to process the CSV file
  };

  return (
    <div>
      <EIEHeadSidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
            <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Implementing Subjects</h1>
          </div>
        </div>
      </div>
      <br />
      <ImplementingSubjectDropdown
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        selectedYearLevel={selectedYearLevel}
        setSelectedYearLevel={setSelectedYearLevel}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
      />
      <UploadingButton onFileUpload={handleFileUpload} />
      <ImplementingSubjectsTable
        selectedProgram={selectedProgram}
        selectedYearLevel={selectedYearLevel}
        selectedSemester={selectedSemester}
      />
      <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
