import React, { useState, useMemo } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import Table1 from "./table/head-poc-table-1st-semester";
import Table2 from "./table/head-poc-table-2nd-semester";

const HeadEiePocDashboard = () => {
  // Determine the current semester
  const currentMonth = new Date().getMonth(); // 0 for January, 11 for December
  const currentSemester = useMemo(() => {
    return currentMonth >= 8 && currentMonth <= 12 ? "1st Semester" : "2nd Semester"; // Aug–Dec: 1st, Jan–May: 2nd
  }, [currentMonth]);

  const [selectedSemester, setSelectedSemester] = useState(currentSemester);

  // Function to toggle semesters
  const toggleSemester = () => {
    setSelectedSemester((prev) => (prev === "1st Semester" ? "2nd Semester" : "1st Semester"));
  };

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br /><br />

    {/* Header Container for Title and Button */}
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: "340px",
      marginRight: "35px"
    }}>
    {/* Title */}
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, color: '#383838' }}>
    Dashboard - {selectedSemester}
    </h1>

    {/* Semester Toggle Button */}
    <button
    onClick={toggleSemester}
    style={{
      padding: "8px 16px",
      backgroundColor: "#DC2626",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold"
    }}
    >
    View {selectedSemester === "1st Semester" ? "2nd Semester" : "1st Semester"}
    </button>
    </div>

    {selectedSemester === "1st Semester" ? <Table1 /> : <Table2 />}
    <br />
    </div>
  );
};

export default HeadEiePocDashboard;
