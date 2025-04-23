import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dropdown-student.css';

const DropdownStudent = ({ onYearLevelChange, onSemesterChange }) => {
    const [yearLevels, setYearLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYearLevel, setCurrentYearLevel] = useState('');
    const [currentSemester, setCurrentSemester] = useState('');

    // Set semester only once on mount
    useEffect(() => {
        const month = new Date().getMonth();
        const detectedSemester = (month >= 7 && month <= 11) ? "1st Semester" : "2nd Semester";
        setCurrentSemester(detectedSemester);
        onSemesterChange(detectedSemester);
    }, []); // <== EMPTY dependency array so it runs only once!


    // Fetch year levels and set default
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/student-year-level-options')
        .then((response) => {
            setYearLevels(response.data);
            setLoading(false);

            const firstYearLevel = response.data[0] || "";
            setCurrentYearLevel(firstYearLevel);
            onYearLevelChange(firstYearLevel);
        })
        .catch((error) => {
            console.error("Error fetching Year Levels:", error);
            setLoading(false);
        });
    }, [onYearLevelChange]);

    return (
        <div className="student-dropdown-container">
        <select
        className="student-dropdown1"
        value={currentYearLevel}
        onChange={(e) => {
            const value = e.target.value;
            setCurrentYearLevel(value);
            onYearLevelChange(value);
        }}
        >
        {loading ? (
            <option>Loading...</option>
        ) : (
            yearLevels.map((yearLevel, index) => (
                <option key={index} value={yearLevel}>
                {yearLevel}
                </option>
            ))
        )}
        </select>

        <select
        className="student-dropdown2"
        value={currentSemester}
        onChange={(e) => {
            const value = e.target.value;
            setCurrentSemester(value);
            onSemesterChange(value);
        }}
        >
        <option value="1st Semester">1st Semester</option>
        <option value="2nd Semester">2nd Semester</option>
        </select>
        </div>
    );
};

export default DropdownStudent;
