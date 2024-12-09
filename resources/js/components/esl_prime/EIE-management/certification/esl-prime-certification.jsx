 import React from "react";
 import ESLSidebar from '../../sidebar/esl-sidebar';
 import UserInfo from '../../user_info/User-info';
const eslCertification = () => {
return(
    <div>
      <ESLSidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Certification</h1>
          </div>
        </div>
      </div>
    </div>
    );
};

export default eslCertification;