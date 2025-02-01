import React, { useState, useEffect } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar'; // Add this import
import UserInfo from '@user-info/User-info';
import ImplementingSubjectDropdown from "./dropdown-button/implementing-subjects-dropdown";
import ImplementingSubjectsTable from "./implementing-subjects-table/implementing-subjects-table";
import UploadingButton from "./upload-implementing-subjects/upload-button";

const EIEHeadImplementingSubjects = () => {
  // State to hold selected filter values
  const [selectedProgram, setSelectedProgram] = useState("BSIT");
  const [selectedYearLevel, setSelectedYearLevel] = useState("1st Year");
  const [selectedSemester, setSelectedSemester] = useState("1st Semester");
  const [employee_id, setEmployeeId] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employee_id");
    console.log('EmployeeID:', storedEmployeeId);
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      console.error("Employee ID is not found in localStorage");
    }
  }, []);

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
    // Add functionality to process the CSV file
  };

  if (!employee_id) {
    return <div>Loading...</div>; // Show a loading state while employee_id is being retrieved
  }

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br/><br/><br/><br/><br/>
    <h1 style={{ ffontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>Implementing Subjects</h1>
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
    employee_id={employee_id} // Pass employee_id as prop if needed
    />
    <br />
    </div>
  );
};

export default EIEHeadImplementingSubjects;
