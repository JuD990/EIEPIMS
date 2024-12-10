import React from "react";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '../user_info/User-info';

const EIEHeadReporting = () => {
    return(
        <div>
            <UserInfo/>
            <EIEHeadSidebar/>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-page-title">
                        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>EIE Reporting</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EIEHeadReporting;