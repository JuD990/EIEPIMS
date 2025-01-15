import React from 'react';
import "./EIEreporting.css"
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from '@user-info/User-info';
import Table1 from "./table/eie-reporting-table-1st-sem";

const EIEreporting = () => {
  return (
    <div>
      <CollegePOCsidebar />
      <UserInfo />
      <br /><br /><br /><br /><br />
      <div className="eie-reporting-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EIE Reporting</h1>
      </div>
      <Table1 />
    </div>
  );
};

export default EIEreporting;
