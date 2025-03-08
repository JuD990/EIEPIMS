import React, { useEffect, useState } from "react";
import "./student-current-subject.css";

const CurrentSubjects = () => {
    const [subjectData, setSubjectData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const student_id = localStorage.getItem("student_id");

    useEffect(() => {
        if (student_id) {
            fetch(`http://127.0.0.1:8000/api/current-subjects/${student_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSubjectData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(`No Current Subjects`);
                setIsLoading(false);
                console.error("Error fetching subject data:", error);
            });
        } else {
            setError("Student ID not found in local storage.");
            setIsLoading(false);
        }
    }, [student_id]);

    return (
        <div className="student-current-subject-2 card-2">
        <h2 className="card-title-2">Current Implementing Subject</h2>
        {isLoading ? (
            <p>Loading...</p>
        ) : error ? (
            <p className="error-message">{error}</p>
        ) : (
            <div>
            <p>Course Code: {subjectData.course_code}</p>
            <p>EPGF Average: {subjectData.epgf_average}</p>
            <p>Course Title: {subjectData.course_title}</p>
            </div>
        )}
        </div>
    );
};

export default CurrentSubjects;
