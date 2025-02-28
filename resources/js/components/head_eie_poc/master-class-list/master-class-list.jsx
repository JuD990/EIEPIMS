import React, { useState } from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import MasterClassListTable from "./master-class-list-table/master-class-list-table";
import UploadClassListButton from "./upload-csv-class-list/upload-csv-class-list";

const MasterClassList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Add state for searchQuery

  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br /><br />
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>
    Master Class List
    </h1>
    <br />
    <div className="eie-head-dropdown-container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
    {/* Right side Search Area */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      borderColor: '#333333',
      paddingLeft: '10px',
      fontSize: '16px',
      marginRight: '385px',
    }}
    />
    </div>
    <br />
    <MasterClassListTable searchQuery={searchQuery} />
    <UploadClassListButton />
    </div>
  );
};

export default MasterClassList;
