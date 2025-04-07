import React, { useState } from "react";
import "./freshmen-reports.css";
import DiagnosticsDropdown from "./../eie-diagnostics-report-dropdown/dropdown";
import FreshmenTable from "./table/freshmen-table";

const FreshmenReports = () => {
    const [department, setDepartment] = useState("");
    const [attendance, setAttendance] = useState("Showed Up");
    const [schoolYear, setSchoolYear] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
        <DiagnosticsDropdown
            department={department}
            setDepartment={setDepartment}
            attendance={attendance}
            setAttendance={setAttendance}
            schoolYear={schoolYear}
            setSchoolYear={setSchoolYear}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        <FreshmenTable
            department={department}
            attendance={attendance}
            schoolYear={schoolYear}
            searchQuery={searchQuery}
        />
        </div>
    );
};

export default FreshmenReports;
