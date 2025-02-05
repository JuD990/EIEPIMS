import React from 'react';
import ESLSidebar from '../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
const EslPrimeDashboard = () => {
  return (
    <div>
      <ESLSidebar />
      <UserInfo />
      <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '320px', color: '#0187F1' }}>Dashboard</h1>
      <br />
    </div>
  );
};

export default EslPrimeDashboard;
