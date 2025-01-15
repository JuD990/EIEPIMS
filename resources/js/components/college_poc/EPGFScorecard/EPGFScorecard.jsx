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
  const [taskTitle, setTaskTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [studentCount, setStudentCount] = useState(0); // enrolled_students
  const [studentCountActive, setStudentCountActive] = useState(0); // active_students
  const [classAverage, setClassAverage] = useState(0);
  const [evaluatedCount, setEvaluatedCount] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const course_code = params.get('course_code');

  // Fetch all necessary data in a single useEffect hook
  useEffect(() => {
    if (course_code) {
      // Fetch all the data in parallel using axios.all for efficiency
      axios.all([
        axios.get(`/api/epgf-scorecard?course_code=${course_code}`),
                axios.get(`/api/get-student-count?course_code=${course_code}`),
                axios.get(`/api/get-student-count-active?course_code=${course_code}`),
                axios.get(`/api/get-evaluated-count?course_code=${course_code}`),
                axios.get(`/api/get-class-average?course_code=${course_code}`)
      ])
      .then(axios.spread((courseDetails, studentCountResponse, activeStudentCountResponse, evaluatedCountResponse, classAverageResponse) => {
        // Handle course details
        if (courseDetails.data.success) {
          setCourseTitle(courseDetails.data.course_title);
        } else {
          console.error('Course not found');
        }

        // Handle student count
        setStudentCount(studentCountResponse.data.student_count);

        // Handle active student count
        setStudentCountActive(activeStudentCountResponse.data.student_count);

        // Handle evaluated count
        setEvaluatedCount(evaluatedCountResponse.data.evaluated_count);

        // Handle class average
        setClassAverage(classAverageResponse.data.average !== undefined ? classAverageResponse.data.average : 0);

      }))
      .catch((error) => {
        console.error('Error fetching data:', error);
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
    <h1 className='epgf-scorecard-subject-name'>{courseTitle || 'Loading...'}</h1>
    </div>
    <h1 className='epgf-scorecard-subject-code'>{course_code}</h1>
    </div>
    </Link>
    <br /><br />

    <div className="epgf-scorecard-page-title">
    <h1 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '28px' }}>Student EIE PGF Scorecard</h1>
    </div>

    <div className='input-container'>
    <div className='input-task-title'>
    <p className='task-label'>Task Title:</p>
    <input
    type="text"
    placeholder="Enter Task Title (Required)"
    className="custom-input"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
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
    <Table course_code={course_code} taskTitle={taskTitle} />
    <br /><br />
    <div className="page-container">
    <div className="container">
    <ClassAverageSummary
    course_code={course_code}
    average={classAverage}
    studentCount={studentCount}
    studentCountActive={studentCountActive}
    evaluatedCount={evaluatedCount}
    />
    </div>
    <div className="border-box">
    <p><b>{evaluatedCount}/{studentCountActive} </b>Evaluated</p>
    </div>
    </div>
    <br /><br /><br /><br />
    </div>
  );
};

export default EPGFScorecard;
