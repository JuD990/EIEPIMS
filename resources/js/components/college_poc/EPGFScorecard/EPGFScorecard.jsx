import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./EPGFScorecard.css"
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from "../user_info/User-info"
import { FaChevronLeft } from 'react-icons/fa';
import Table from "./table/scorecard-table";
import Button from './buttons/submit-button';
import ExportButton from './buttons/export-button';
import ClassAverageSummary from './class-average-summary/class-average-summary';

const EPGFScorecard = () => {

    // Function to handle changes to the input
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const handleSearchInputChange = (event) => {
      setInputValue(event.target.value);
    };

  return (
    <div>
      <UserInfo />
      <CollegePOCsidebar />
      
      <br /><br />
      <Link to="/class-management" style={{ textDecoration: 'none' }}>
        <div className='epgf-scorecard-subject-details'>
          <div className='subject-name-container'>
            <FaChevronLeft className='back-icon' />
            <h1 className='epgf-scorecard-subject-name' style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>Capstone 1</h1>
          </div>
          <h1 className='epgf-scorecard-subject-code' style={{ fontFamily: 'Epilogue', fontWeight: 400 }}>BSIT321K- KTa</h1>
        </div>
        <br /><br />
      </Link>
      <div className="epgf-scorecard-page-title">
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Student EIE PGF Scorecard</h1>
      </div>

      <div className='input-container'>
        <div className='input-task-title'>
          <p className='task-label'>Task Title:</p>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Task Title..."
            className="custom-input"
          />
        </div>

        <div className='search'>
          <input
            type="text"
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>
      <br />
      <Table />
      <br /><br />
        <div style={{ position: 'relative', width: '100%' }}>
          <Button label="Submit" rightSpacing="35px" />
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
        <ExportButton label="Export" rightSpacing="200px" />
        </div>
        <div className="border-box">
          <p><b>4/50 </b>Evaluated</p>
        </div>
        <br />
        <ClassAverageSummary />
        <br /><br /><br /><br />
    </div>
  );
};

export default EPGFScorecard;
