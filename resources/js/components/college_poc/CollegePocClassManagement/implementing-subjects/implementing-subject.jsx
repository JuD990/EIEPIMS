import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import studentnoicon from "@assets/student-no.png";
import axios from 'axios'; // Install axios for API requests
import "./implementing-subject.css";

const ImplementingSubjects = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [userClasses, setUserClasses] = useState([]); // Array to hold multiple classes
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employee_id');

    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      setErrorMessage('Employee ID is not available.');
      setLoading(false);
      return;
    }

    const fetchClassData = async () => {
      try {
        const response = await axios.get(`/api/implementing-subject/${storedEmployeeId}`);
        if (response.data.success) {
          setUserClasses(response.data.classData); // Set multiple classes
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage('Error fetching class data');
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, []);

  return (
    <div className="example-subjects">
      {loading ? (
        <div>Loading...</div>
      ) : userClasses.length > 0 ? ( // Check if there are any classes to display
        userClasses.map((userClass) => (
          <Link to="/epgf-scorecard" className="subject-info" key={userClass.id}>
            <div className="subject-1">
              <div className="combined-card">
                <div className="interior-card"></div>
                <div className="content">
                  <div className="implementing-subject-1">
                    <div className="subject-info">
                      <p className="course-title">{userClass.course_title}</p>
                        <p className="course-code">{userClass.course_code}</p>
                        <div className="student-number">
                          <img src={studentnoicon} alt="Student Number" />
                          <p>0</p> {/* number of students enrolled */}
                        </div>
                    </div>
                  </div>
                  <div className="class-performance">
                    <div className="eie-averages">
                      <div className="pgf-average">
                        <p>{userClass.epgf_average}4.0</p>
                        <p>EPGF Average</p>
                      </div>

                      <div className="completion-rate">
                        <p>{userClass.completion_rate}60%</p>
                        <p>Completion Rate</p>
                      </div>

                      <div className="proficiency-level">
                        <p style={{ color: 'green' }}>{userClass.proficiency_level}Proficient</p>
                        <p>Proficiency</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="no-class-available">{errorMessage || 'No Classes Available'}</div>
      )}
    </div>
  );
};

export default ImplementingSubjects;
