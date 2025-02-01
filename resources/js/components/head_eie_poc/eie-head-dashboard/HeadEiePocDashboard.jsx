import React from 'react';
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';

const HeadEiePocDashboard = () => {
  return (
    <div>
      <EIEHeadSidebar/>
      <UserInfo/>
      <br/><br/><br/><br/><br/>
      <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '350px', color: '#0187F1' }}>Dashboard</h1>
    </div>
  );
};

export default HeadEiePocDashboard;
