import React, { useState } from "react";
import "./grad-reports.css";
import DiagnosticsDropdown from "./../eie-diagnostics-report-dropdown/dropdown";
import GradTable from "./table/grad-table";

const EIEDiagnostics = () => {
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
            <GradTable
                department={department}
                attendance={attendance}
                schoolYear={schoolYear}
                searchQuery={searchQuery}
            />
        </div>
    );
};

export default EIEDiagnostics;
