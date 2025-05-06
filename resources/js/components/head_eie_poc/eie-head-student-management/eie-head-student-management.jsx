import React, { useEffect, useState } from "react";
import axios from "axios";
import EIEHeadSidebar from '../sidebar/eie-head-sidebar';
import UserInfo from '@user-info/User-info';
import "./student-management.css";

const EIEHeadStudentManagement = () => {
  const [stats, setStats] = useState({
    total_students: 0,
    active_students: 0,
    active_percentage: 0,
    graduating_students: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employeeId = localStorage.getItem("employee_id");
        const response = await axios.get(`http://127.0.0.1:8000/api/student-statistics?employee_id=${employeeId}`);
        setStats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch student statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const summaryItems = [
    {
      label: "Total Number of Enrolled Students",
      value: stats.total_students,
      description: "Currently enrolled this semester",
    },
    {
      label: "Total Number of Active Students",
      value: stats.active_students,
      description: "Actively attending classes",
    },
    {
      label: (
        <>
        Overall
        <br /><br />
        </>
      ),
      value: (
        <>
        {stats.active_percentage}%
        <br />
        </>
      ),
      description: (
        <>
        Active & Enrolled Students %
        <br />
        </>
      ),
    },
    {
      label: "Number of Graduating Students",
      value: stats.graduating_students,
      description: "Eligible for graduation",
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
    {summaryItems.map((item, index) => (
      <div key={index} className="student-summary-box">
      <span className="student-summary-label">{item.label}</span>
      <span className="student-summary-value">{item.value}</span>
      <span className="student-summary-description">{item.description}</span>
      </div>
    ))}
    </div>
    </div>
  );
};

export default EIEHeadStudentManagement;
