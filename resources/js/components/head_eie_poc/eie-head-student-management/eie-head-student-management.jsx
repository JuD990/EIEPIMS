import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import ExportButton from './buttons/export-button';
import StudentManagementDropdown from './dropdown-button/student-management-dropdown';
import StudentManagementTable from './student-management-table/student-management-table';

const EIEHeadStudentManagement = () => {

    return(
        <div>
        <EIEHeadSidebar/>
        <UserInfo/>
        <br/><br/><br/><br/><br/>
        <h1 style={{ ffontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>Student Management</h1>
        <StudentManagementDropdown/>
        <div style={{ position: 'relative', width: '100%' }}>
        <ExportButton label="Export" rightSpacing="34px" />
      </div>
      <br />
        <StudentManagementTable/>
        <br />
      </div>
    );
};

export default EIEHeadStudentManagement;
