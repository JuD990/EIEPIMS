import React from 'react';
import "./EIEreporting.css"
import SidebarEIEreporting from "./sidebar/sidebarEIEreporting";
import UserInfo from "../user_info/User-info";

const EIEreporting = () => {
  return (
    <div>
      <SidebarEIEreporting />
      <UserInfo />
      <br /><br /><br /><br /><br />
      <div className="eie-reporting-page-title">
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EIE Reporting</h1>
      </div>
    </div>
  );
};

export default EIEreporting;
