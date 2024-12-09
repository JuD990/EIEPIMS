import React from "react";
import ESLSidebar from '../../sidebar/esl-sidebar';
import UserInfo from '../../user_info/User-info';
import EPGFrubricVersionDropdown from "./dropdown-button/epgf-rubric-version-dropdown";
const eslPrimeEPGFRubricVersion = () => {
return(
    <div>
      <ESLSidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EPGF Rubric Version</h1>
          </div>
        </div>
      </div>
      <EPGFrubricVersionDropdown />
    </div>
    );
};

export default eslPrimeEPGFRubricVersion;