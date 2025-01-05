import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./EPGFScorecard.css";
import CollegePOCsidebar from "../sidebar/college-poc-sidebar";
import UserInfo from '@user-info/User-info';
import { FaChevronLeft } from 'react-icons/fa';
import Table from "./table/scorecard-table-2";
import Button from './buttons/submit-button';
import ExportButton from './buttons/export-button';
import ClassAverageSummary from './class-average-summary/class-average-summary';
import axios from 'axios';

const EPGFScorecard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const course_code = params.get('course_code');

  const [courseTitle, setCourseTitle] = useState(''); // State to store the course_title

  // Fetch the course details when course_code is available
  useEffect(() => {
    if (course_code) {
      axios.get(`/api/epgf-scorecard?course_code=${course_code}`)
      .then((response) => {
        if (response.data.success) {
          setCourseTitle(response.data.course_title); // Set course title
        } else {
          console.error('Course not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
      });
    }
  }, [course_code]);

  return (
    <div>
    <UserInfo />
    <CollegePOCsidebar />

    <br /><br />
    <Link to="/class-management" style={{ textDecoration: 'none' }}>
    <div className='epgf-scorecard-subject-details'>
    <div className='subject-name-container'>
    <FaChevronLeft className='back-icon' />
    <h1 className='epgf-scorecard-subject-name'>{courseTitle || 'Loading...'}</h1> {/* Display course_title dynamically */}
    </div>
    <h1 className='epgf-scorecard-subject-code'>{course_code}</h1>
    </div>
    <br /><br />
    </Link>
    <div className="epgf-scorecard-page-title">
    <h1 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '28px' }}>Student EIE PGF Scorecard</h1>
    </div>

    <div className='input-container'>
    <div className='input-task-title'>
    <p className='task-label'>Task Title:</p>
    <input
    type="text"
    placeholder="Task Title..."
    className="custom-input"
    />
    </div>

    <div className='search'>
    <input
    type="text"
    placeholder="Search..."
    className="search-input"
    />
    </div>
    </div>
    <br />
    <Table course_code={course_code} />
    <br /><br />
    <div style={{ position: 'relative', width: '100%' }}>
      <Button label="Submit" />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
      <ExportButton label="Export" rightSpacing="180px" />
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
