import React, { useState } from "react";
import "./EIEreporting.css"
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from '@user-info/User-info';
import Table1 from "./table/eie-reporting-table-1st-sem";
import Table2 from "./table/eie-reporting-table-2nd-sem";

const EIEreporting = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility

  const currentMonth = new Date().getMonth(); // 0 for January, 11 for December

  // Check if current month is between August (7) and December (11) or January (0) and May (4)
  const isSecondSemester = currentMonth >= 7 && currentMonth <= 11; // August to December
  const isFirstSemester = currentMonth >= 0 && currentMonth <= 4; // January to May

  return (
    <div>
      <CollegePOCsidebar />
      <UserInfo />
      <br /><br /><br /><br /><br />
      <div className="eie-reporting-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EIE Reporting</h1>
      </div>
      {isSecondSemester ? <Table1 /> : isFirstSemester ? <Table2 /> : null}
    </div>
  );
};

export default EIEreporting;
