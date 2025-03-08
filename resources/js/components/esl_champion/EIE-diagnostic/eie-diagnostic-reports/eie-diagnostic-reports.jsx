import React from "react";
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import './eie-diagnostic-reports.css';
const eslPrimeDiagnostics = () => {
return(
    <div>
        <Sidebar/>
        <UserInfo/>
        <br/><br/><br/><br/><br/>
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>Diagnostics Reports</h1>
    </div>
    );
};

export default eslPrimeDiagnostics;
