import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import studentnoicon from "@assets/student-no.png";
import axios from "axios";
import "./implementing-subject.css";

const ImplementingSubjects = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [userClasses, setUserClasses] = useState([]); // Array to hold multiple classes
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStudentCounts, setActiveStudentCounts] = useState({}); // To store active student counts

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employee_id");

    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      setErrorMessage("Employee ID is not available.");
      setLoading(false);
      return;
    }

    const fetchClassData = async () => {
      try {
        const response = await axios.get(`/api/implementing-subject/${storedEmployeeId}`);
        if (response.data.success) {
          setUserClasses(response.data.classData); // Set multiple classes

          // Fetch active students for each course code
          response.data.classData.forEach((userClass) => {
            fetchActiveStudents(userClass.course_code);
          });
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage("Error fetching class data");
      } finally {
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

  return (
    <div className="example-subjects">
    {loading ? (
      <div>Loading...</div>
    ) : userClasses.length > 0 ? (
      userClasses.map((userClass) => (
        <Link
        to={`/epgf-scorecard?course_code=${userClass.course_code}`} // Pass as query param
        className="subject-info"
        key={userClass.id}
        >
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
        <p>{activeStudentCounts[userClass.course_code] || 0}</p>
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
        <p style={{ color: "green" }}>{userClass.proficiency_level}Proficient</p>
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
      <div className="no-class-available">{errorMessage || "No Classes Available"}</div>
    )}
    </div>
  );
};

export default ImplementingSubjects;
