import React, { useState, useMemo, useEffect } from "react";
import UserInfo from "@user-info/User-info";
import TableComponent from "./table/lead-poc-dashboard";
import LeadSidebar from "./sidebar/lead-poc-sidebar";
import DashboardDropdown from "./dropdown-button/dropdown-lead-poc-dashboard";

const LeadEiePocDashboard = () => {
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
    <LeadSidebar />
    <UserInfo />
    <br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>
    Dashboard - {selectedSemester}/{selectedDepartment}-{selectedSchoolYear}
    </h1>

    {/* Pass state setters to Dropdown */}
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
  );
};

export default LeadEiePocDashboard;
