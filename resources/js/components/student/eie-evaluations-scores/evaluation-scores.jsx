import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./evaluation-scores.css";

const EvaluationScores = () => {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState("Select a Course");
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const studentId = localStorage.getItem("student_id");
        if (studentId) {
            axios.get(`http://127.0.0.1:8000/api/get-courses?student_id=${studentId}`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
        }
    }, []);

    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setSelectedCourse(selected);

        // Filter tasks based on the selected course
        const filteredTasks = courses.filter(course => course.course_title === selected);
        setTasks(filteredTasks);
    };

    const navigateToViewScores = (historicalScorecardId) => {
        navigate(`/view-scores/${historicalScorecardId}`);
    };

    return (
        <div className="student-dashboard-card-4 card-4">
        <h2 className="card-title-4">EIE Evaluation Scores</h2>
        <div className="evaluation-scores-dropdown-container">
        <select
        className="evaluation-scores-custom-dropdown"
        value={selectedCourse}
        onChange={handleSelectChange}
        >
        <option value="Select a Course">Select a Course</option>
        {courses.map((course, index) => (
            <option key={index} value={course.course_title}>
            {course.course_title}
            </option>
        ))}
        </select>
        <span className="evaluation-scores-dropdown-icon">▼</span>
        </div>

        <table className="evaluation-scores-table">
        <thead>
        <tr>
        <th>TASK TITLE</th>
        <th>TYPE</th>
        <th>DATE</th>
        <th></th>
        </tr>
        </thead>
        <tbody>
        {tasks.map((task, index) => (
            <tr key={index}>
            <td>{task.task_title}</td>
            <td>{task.type}</td>
            <td>{task.date}</td>
            <td>
            <button
            className="view-score-link"
            onClick={() => navigateToViewScores(task.historical_scorecards_id)}
            >
            View Score
            </button>
            </td>
            </tr>
        ))}
        </tbody>

        </table>
        </div>
    );
};

export default EvaluationScores;
