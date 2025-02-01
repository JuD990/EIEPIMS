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
        <br/><br/><br/><br/><br/>
        <h1 style={{ ffontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>Master Class List</h1>
        <br />
        <MasterClassListDropdown/>
        <br /><br />
        <MasterClassListTable/>

        <UploadClassListButton/>
      </div>
    );
};

export default MasterClassList;
