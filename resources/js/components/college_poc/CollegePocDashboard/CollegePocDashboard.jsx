import React, { useState } from "react";
import "./CollegePocDashboard.css";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from "@user-info/User-info";
import Table1 from "./table/college-poc-table-1st-semester";
import Table2 from "./table/college-poc-table-2nd-semester";
import LogoutButton from "@logout/Logout";

const CollegePocDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility

  const currentMonth = new Date().getMonth(); // 0 for January, 11 for December

  // Check if current month is between August (7) and December (11) or January (0) and May (4)
  const isSecondSemester = currentMonth >= 7 && currentMonth <= 11; // August to December
  const isFirstSemester = currentMonth >= 0 && currentMonth <= 4; // January to May

  return (
    <div>
    <CollegePOCsidebar />
    <UserInfo />
    <div className="dashboard-container">
    <div className="dashboard-content">
    <div className="dashboard-page-title">
    <h1 style={{ fontFamily: "Epilogue", fontWeight: 800 }}>Dashboard</h1>
    </div>
    </div>
    </div>
    <br />
    {isSecondSemester ? <Table1 /> : isFirstSemester ? <Table2 /> : null}
    <br />
    </div>
  );
};

export default CollegePocDashboard;
