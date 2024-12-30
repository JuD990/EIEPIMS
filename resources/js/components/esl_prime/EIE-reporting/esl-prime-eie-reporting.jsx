import React from "react";
import Sidebar from '../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import "./esl-prime-eie-reporting.css"
const eslPrimeEieReporting = () => {
return(
    <div>
      <Sidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EIE Reporting</h1>
          </div>
        </div>
      </div>
    </div>
    );
};

export default eslPrimeEieReporting;
