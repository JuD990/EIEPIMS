import React, { useState } from "react";
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import './eie-diagnostic-reports.css';
import GraduatingReports from "./graduating-reports/grad-reports";
import FreshmenReports from "./freshmen-reports/freshmen-reports";

const eslPrimeDiagnostics = () => {
const [activeTab, setActiveTab] = useState(1);

return(
    <div>
        <Sidebar/>
        <UserInfo/>
        <br/><br/><br/><br/><br/>
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>Diagnostics Reports</h1>

    <div className="tabs-container">
    {/* Tabs */}
    <div
    onClick={() => setActiveTab(1)}
    className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
    >
    <p> Freshmen EPGF Benchmark Scorecard  </p>
    </div>
    <div
    onClick={() => setActiveTab(2)}
    className={`tab ${activeTab === 2 ? "active-tab" : ""}`}
    >
    <p> Graduating EPGF Oral Diagnostics  </p>
    </div>
    </div>

    {/* Divider line */}
    <div className="divider-line"></div>
    {/* Display corresponding content based on active tab */}
    {activeTab === 1 && <FreshmenReports />}
    {activeTab === 2 && <GraduatingReports />}



    </div>
  );
};

export default eslPrimeDiagnostics;
