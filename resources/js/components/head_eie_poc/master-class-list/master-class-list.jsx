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
    <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>
    Master Class List
    </h1>
    <br />
    <div
    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      maxWidth: '1200px', /* Adjust based on your layout */
      margin: '0 auto', /* Center within a max-width */
      paddingRight: '20px', /* Add some spacing */
      marginLeft: '705px',
    }}>

    {/* Right side Search Area */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '100%',  /* Ensure responsiveness */
      maxWidth: '400px', /* Prevent exceeding page */
      height: '50px', /* Adjust height */
      borderRadius: '8px',
      border: '1px solid #333333',
      fontSize: '16px',
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
