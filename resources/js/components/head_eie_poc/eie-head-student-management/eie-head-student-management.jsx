import React, { useEffect, useState } from "react";
import axios from "axios";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import nonSeniorIcon from "@assets/lowLevel.png";  // 1st to 3rd Year
import seniorIcon from "@assets/4thYear.png";  // 4th Year
import "./student-management.css";

const EIEHeadStudentManagement = () => {
  const [stats, setStats] = useState({
    total_students: 0,
    active_students: 0,
    active_percentage: 0,
    graduating_students: 0,
    freshmen: { total: 0, active: 0, active_percentage: 0 },
    sophomores: { total: 0, active: 0, active_percentage: 0 },
    juniors: { total: 0, active: 0, active_percentage: 0 },
    seniors: { total: 0, active: 0, active_percentage: 0 },
  });

  // Fetch student statistics from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employeeId = localStorage.getItem("employee_id");
        const response = await axios.get(`http://127.0.0.1:8000/api/student-statistics?employee_id=${employeeId}`);
        console.log(response.data);  // Log the API response to check student statistics
        setStats(response.data); // Update the state with API data
      } catch (error) {
        console.error("Failed to fetch student statistics:", error);
      }
    };

    fetchStats();
  }, []);  // Empty dependency array ensures this runs once on component mount

  const summaryItems = [
    {
      label: "Freshmen",
      value: `${stats.freshmen.total}`,
      description: (
        <div className="description-flex">
        <span>Students</span>
        <span>{stats.freshmen.active_percentage}%</span>
        </div>
      ),
      color: "#1B9F24",
      icon: nonSeniorIcon,
      subjects: stats.freshmen.subjects?.map(s => s.course_title) || [],
    },
    {
      label: "Sophomore",
      value: `${stats.sophomores.total}`,
      description: (
        <div className="description-flex">
        <span>Students</span>
        <span>{stats.sophomores.active_percentage}%</span>
        </div>
      ),
      color: "#C7B213",
      icon: nonSeniorIcon,
      subjects: stats.sophomores.subjects?.map(s => s.course_title) || [],
    },
    {
      label: "Junior",
      value: `${stats.juniors.total}`,
      description: (
        <div className="description-flex">
        <span>Students</span>
        <span>{stats.juniors.active_percentage}%</span>
        </div>
      ),
      color: "#2294F2",
      icon: nonSeniorIcon,
      subjects: stats.juniors.subjects?.map(s => s.course_title) || [],
    },
    {
      label: "Senior",
      value: `${stats.seniors.total}`,
      description: (
        <div className="description-flex">
        <span>Students</span>
        <span>{stats.seniors.active_percentage}%</span>
        </div>
      ),
      color: "#D93F3F",
      icon: seniorIcon,
      subjects: stats.seniors.subjects?.map(s => s.course_title) || [],
    },
  ];


  return (
    <div>
    <EIEHeadSidebar />
    <UserInfo />
    <br /><br /><br /><br />
    <h1 className="student-management-title">Student Management</h1>
    <br /><br /><br />
    <h1 className="student-summary-title">Summary of Students</h1>

    <div className="student-summary-boxes">
    {summaryItems.map((item, index) => {
      const isYearLevel = ["Freshmen", "Sophomore", "Junior", "Senior"].includes(item.label);

      return (
        <div key={index} className={`student-summary-box ${isYearLevel ? 'year-level' : ''}`}>
        <div className="student-summary-label-container">
        <span
        className="student-summary-label"
        style={{
          color: item.color || "inherit",
          textAlign: isYearLevel ? "left" : "center",
          fontWeight: isYearLevel ? "bold" : "normal",
          margin: isYearLevel ? "0" : "auto",
          fontSize: isYearLevel ? "35px" : "",
        }}
        >
        {item.label}
        </span>
        {isYearLevel && (
          <img
          src={item.icon}
          alt={`${item.label} icon`}
          className="student-summary-image"
          />
        )}
        </div>
        <span className={`student-summary-value ${isYearLevel ? 'left-align-value' : ''}`}>
        {item.value}
        </span>
        <span className="student-summary-description">
        {item.description}
        </span>

        {isYearLevel && (
          <div className="subject-list">
          <strong>Implementing Subjects:</strong>
          {item.subjects.length > 0 ? (
            <ul>
            {item.subjects.map((subject, idx) => (
              <li key={idx}>{subject}</li>
            ))}
            </ul>
          ) : (
            <p>No subjects available</p>
          )}
          </div>
        )}
        </div>
      );
    })}
    </div>
    </div>
  );
};

export default EIEHeadStudentManagement;
