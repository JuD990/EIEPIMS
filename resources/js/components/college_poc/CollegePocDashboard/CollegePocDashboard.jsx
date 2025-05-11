import React, { useState, useMemo, useEffect } from "react";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from "@user-info/User-info";
import TableComponent from "./table/college-poc-dashboard";
import DashboardDropdown from "./dropdown-button/dropdown-college-poc-dashboard";
import ImpSubjectsPerformance from "./imp-subject-performance/imp-subjects-performance";

const CollegePocDashboard = () => {
  const currentMonth = new Date().getMonth(); // 0 for January, 11 for December

  // Default values based on logic in DashboardDropdown
  const defaultSemester = currentMonth >= 8 && currentMonth <= 12 ? "1st Semester" : "2nd Semester";
  const defaultSchoolYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(defaultSchoolYear);
  const [selectedSemester, setSelectedSemester] = useState(defaultSemester);

  useEffect(() => {
    // You can also manage side-effects here if necessary
  }, [selectedDepartment, selectedSchoolYear, selectedSemester]);

  return (
    <div>
    <CollegePOCsidebar />
    <UserInfo />
    <br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>
    Dashboard
    </h1>
    <ImpSubjectsPerformance/>
    <br />

    <div className="dashboard-table-container">
    <div style={{ marginBottom: "10px" }}>
    {/* Pass state setters to Dropdown */}
    <h2 style={{ textAlign: "left", fontFamily: "Poppins", fontWeight: "700" }}>Table Form - {selectedSemester}, {selectedDepartment} {selectedSchoolYear.replace('/', '-')}</h2>
    <DashboardDropdown
    setSelectedDepartment={setSelectedDepartment}
    setSelectedSchoolYear={setSelectedSchoolYear}
    setSelectedSemester={setSelectedSemester}
    />

    {/* Pass selected values to TableComponent */}
    <TableComponent
    department={selectedDepartment}
    schoolYear={selectedSchoolYear}
    semester={selectedSemester}
    />
    </div>
    </div>
    <br />
    </div>
  );
};

export default CollegePocDashboard;
