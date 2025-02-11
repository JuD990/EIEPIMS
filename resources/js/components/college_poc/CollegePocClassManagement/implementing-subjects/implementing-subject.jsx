import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import studentnoicon from "@assets/student-no.png";
import axios from "axios";
import "./implementing-subject.css";

const ImplementingSubjects = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [userClasses, setUserClasses] = useState([]); // Array to hold multiple classes
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStudentCounts, setActiveStudentCounts] = useState({}); // To store active student counts
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const course_code = params.get('course_code');

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employee_id");

    console.log("Stored Employee ID:", storedEmployeeId);

    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      console.error("Employee ID is not available.");
      setErrorMessage("Employee ID is not available.");
      setLoading(false);
      return;
    }

    const fetchClassData = async () => {
      try {
        console.log("Fetching class data for Employee ID:", storedEmployeeId);
        const response = await axios.get(`/api/implementing-subject/${storedEmployeeId}`);

        console.log("API Response:", response.data);

        if (response.data.success) {
          setUserClasses(response.data.classData); // Set multiple classes
          console.log("Class Data:", response.data.classData);

          // Fetch active students for each course code
          response.data.classData.forEach((userClass) => {
            console.log("Fetching active students for course code:", userClass.course_code);
            fetchActiveStudents(userClass.course_code);
          });
        } else {
          console.error("Error Message from API:", response.data.message);
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
        setErrorMessage("Error fetching class data");
      } finally {
        console.log("Fetch process complete");
        setLoading(false);
      }
    };

    fetchClassData();
  }, []);


  const fetchActiveStudents = async (course_code) => {
    try {
      const response = await axios.get(`/api/active-students?course_code=${course_code}`);
      if (response.data.success) {
        setActiveStudentCounts((prevCounts) => ({
          ...prevCounts,
          [course_code]: response.data.active_student_count,
        }));
      }
    } catch (error) {
      console.error(`Error fetching active students for course code ${course_code}:`, error);
    }
  };

  const epgfProficiencyLevels = [
    { threshold: 0.00, level: 'Beginning', color: 'red' },
    { threshold: 0.50, level: 'Low Acquisition', color: 'red' },
    { threshold: 0.75, level: 'High Acquisition', color: 'red' },
    { threshold: 1.00, level: 'Emerging', color: '#FFCD56' },
    { threshold: 1.25, level: 'Low Developing', color: '#FFCD56' },
    { threshold: 1.50, level: 'High Developing', color: '#FFCD56' },
    { threshold: 1.75, level: 'Low Proficient', color: '#FFCD56' },
    { threshold: 2.00, level: 'Proficient', color: 'green' },
    { threshold: 2.25, level: 'High Proficient', color: 'green' },
    { threshold: 2.50, level: 'Advanced', color: 'green' },
    { threshold: 3.00, level: 'High Advanced', color: '#00008B' },
    { threshold: 4.00, level: 'Native/Bilingual', color: '#00008B' },
  ];

  const getProficiencyLevel = (epgfAverage) => {
    for (let i = 0; i < epgfProficiencyLevels.length; i++) {
      const current = epgfProficiencyLevels[i];
      const previous = epgfProficiencyLevels[i - 1];

      if (
        (previous ? epgfAverage > previous.threshold : true) && // Greater than the previous threshold
        epgfAverage <= current.threshold // Less than or equal to the current threshold
      ) {
        return { level: current.level, color: current.color };
      }
    }
    return { level: 'Unknown', color: 'black' };
  };

  return (
    <div className="example-subjects">
    {loading ? (
      <div>Loading...</div>
    ) : userClasses.length > 0 ? (
      userClasses.map((userClass) => {
        const { level, color } = getProficiencyLevel(userClass.epgf_average);
        return (
          <Link
          to={{
            pathname: `/epgf-scorecard`,
            search: `?course_code=${userClass.course_code}`, // Query string for course_code
            state: {
              userClass, // Pass the entire userClass object
              activeStudentCount: activeStudentCounts[userClass.course_code] || 0, // Pass the specific student count
            },
          }}
          className="subject-info"
          key={`${userClass.id}-${userClass.course_code}`}
          >
          <div className="subject-1">
          <div className="combined-card">
          <div className="interior-card"></div>
          <div className="">
          <div className="implementing-subject-1">
          <div className="subject-info">
          <p className="course-title">{userClass.course_title}</p>

          <div className="subject-info">
          <p className="course-code">{userClass.course_code}</p>
          <div className="student-number">
          <img src={studentnoicon} alt="Student Number" />
          <p>{activeStudentCounts[userClass.course_code] || 0}</p>
          </div>
          </div>
          </div>
          </div>
          <div className="class-performance">
          <div className="eie-averages">
          <div className="pgf-average">
          <p>{(userClass.epgf_average)}</p>
          <p>EPGF Average</p>
          </div>
          <div className="completion-rate">
          <p>{Number(userClass.completion_rate).toFixed(2).replace(/\.00$/, '')}%</p>
          <p>Completion Rate</p>
          </div>
          <div className="proficiency-level">
          <p style={{ color }}>{level}</p>
          <p>Proficiency Level</p>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </Link>
        );
      })
    ) : (
      <div className="no-class-available">{errorMessage || "No Classes Available"}</div>
    )}
    </div>
  );
};

export default ImplementingSubjects;
