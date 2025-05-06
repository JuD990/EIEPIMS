import React, { useState } from "react";
import "./graduating-list.css";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import MasterClassListDropdown from './dropdown-button/master-class-list-dropdown';
import MasterClassListTable from "./master-class-list-table/master-class-list-table";
import UploadClassListButton from "./upload-csv-class-list/upload-csv-class-list";

const GraduatingList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedYearLevel, setSelectedYearLevel] = useState("");

    return (
        <div>
            <EIEHeadSidebar />
            <UserInfo/>
            <br /><br /><br /><br /><br />
            <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#383838' }}>Graduating List</h1>
            <br /><br />
            <MasterClassListDropdown
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            selectedYearLevel={selectedYearLevel}
            setSelectedYearLevel={setSelectedYearLevel}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            />
            <br /><br />
            <MasterClassListTable
            searchQuery={searchQuery}
            selectedProgram={selectedProgram}
            selectedYearLevel={selectedYearLevel}
            />
            <UploadClassListButton />
        </div>
    );
};

export default GraduatingList;
