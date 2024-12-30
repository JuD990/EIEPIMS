import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import MasterClassListDropdown from "./dropdown-button/master-class-list-dropdown";
import MasterClassListTable from "./master-class-list-table/master-class-list-table"
import UploadClassListButton from "./upload-csv-class-list/upload-csv-class-list";

const MasterClassList = () => {

    return(
        <div>
        <EIEHeadSidebar/>
        <UserInfo/>
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-page-title">
            <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Master Class List</h1>
            </div>
          </div>
        </div>
        <br />
        <MasterClassListDropdown/>
        <br /><br />
        <MasterClassListTable/>

        <UploadClassListButton/>
      </div>
    );
};

export default MasterClassList;
