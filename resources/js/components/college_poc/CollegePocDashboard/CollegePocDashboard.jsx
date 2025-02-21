import React, { useState, useMemo } from "react";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from "@user-info/User-info";
import Table1 from "./table/college-poc-table-1st-semester";
import Table2 from "./table/college-poc-table-2nd-semester";

const CollegePocDashboard = () => {
  // Determine the current semester
  const currentMonth = new Date().getMonth(); // 0 for January, 11 for December
  console.log(currentMonth);
  const semester = useMemo(() => {
    if (currentMonth >= 8 && currentMonth <= 12) return "1st Semester"; // Aug–Dec
    return "2nd Semester"; // Jan–May (default)
  }, [currentMonth]);

  return (
    <div>
    <CollegePOCsidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#0187F1' }}>
    Dashboard - {semester}
    </h1>
    <br />
    {semester === "1st Semester" ? <Table1 /> : <Table2 />}
    <br />
    </div>
  );
};

export default CollegePocDashboard;
