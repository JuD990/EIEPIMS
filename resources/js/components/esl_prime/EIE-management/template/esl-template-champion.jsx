import React, { useState } from "react";
import ESLSidebar from "../../sidebar/esl-sidebar";
import UserInfo from "@user-info/User-info";
import MonthlyChampion from "./monthly-champions/MonthlyChampion";
import EIEDiagnostics from "./eie-diagnostics/EIEDiagnostics";
import "./esl-template-champion.css";

const eslTemplate = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to Monthly Champion tab

  return (
    <div>
    <ESLSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />

    <h1 className="certification-title">EIE Template</h1>

    <div className="tabs-container">
    {/* Tabs */}
    <div
    onClick={() => setActiveTab(1)}
    className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
    >
    <p> Monthly Champion </p>
    </div>
    <div
    onClick={() => setActiveTab(2)}
    className={`tab ${activeTab === 2 ? "active-tab" : ""}`}
    >
    <p> EIE Diagnostics </p>
    </div>
    </div>

    {/* Divider line */}
    <div className="divider-line"></div>
    {/* Display corresponding content based on active tab */}
    {activeTab === 1 && <MonthlyChampion />}
    {activeTab === 2 && <EIEDiagnostics />}



    </div>
  );
};

export default eslTemplate;
