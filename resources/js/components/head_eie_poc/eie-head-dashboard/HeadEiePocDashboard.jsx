import React from 'react';
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import './HeadEiePocDashboard.css'

const HeadEiePocDashboard = () => {
  return (
    <div>
      <EIEHeadSidebar/>
      <UserInfo/>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadEiePocDashboard;
