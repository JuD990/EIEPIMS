import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';

const EIEHeadReporting = () => {
    return(
        <div>
            <UserInfo/>
            <EIEHeadSidebar/>
            <br/><br/><br/><br/><br/>
            <h1 style={{ ffontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>EIE Reporting</h1>

        </div>
    );
};

export default EIEHeadReporting;
