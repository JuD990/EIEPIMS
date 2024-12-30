import React from "react";
import ESLSidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import './esl-prime-monthly-champion.css';

const eslMonthlyChampions = () => {
return(
    <div>
      <ESLSidebar />
      <UserInfo />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Monthly Champions</h1>
          </div>
        </div>
      </div>
    </div>
    );
};

export default eslMonthlyChampions;
