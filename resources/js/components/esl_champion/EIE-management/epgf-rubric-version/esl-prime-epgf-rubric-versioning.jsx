import React from "react";
import ESLSidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import EPGFrubricVersionDropdown from "./dropdown-button/epgf-rubric-version-dropdown";
import Table from "./table/epgf-rubric-table";
import UploadCSVButton from "./buttons/upload-csv-button";
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
      <br />
      <Table />
      <div style={{ position: 'relative', width: '100%' }}>
        <UploadCSVButton label="Upload CSV" rightSpacing="50px" />
      </div>
      <br /><br /><br /><br />
    </div>
    );
};

export default eslPrimeEPGFRubricVersion;
