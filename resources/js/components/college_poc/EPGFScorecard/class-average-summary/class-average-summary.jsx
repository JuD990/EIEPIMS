import React, { useState, useEffect } from "react";
import axios from "axios";
import './class-average-summary.css';

const ClassAverageSummary = ({ course_code, average, studentCount, evaluatedCount, studentCountActive }) => {
  // studentCount value will be stored in the enrolled_students
  // studentCountActive will be stored in the active_students

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

  const { level, color } = getProficiencyLevel(average);

  // Calculate Completion Rate based on studentCount and evaluatedCount
  const completionRate = studentCount > 0 ? ((evaluatedCount / studentCount) * 100).toFixed(0) : 0;

  // Send data to backend API
  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        const response = await axios.post('/api/store-class-data', {
          course_code,
          average,
          completionRate,
          proficiencyLevel: level,
          enrolled_students: studentCount, // Send studentCount as enrolled_students
          active_students: studentCountActive, // Send studentCountActive as active_students
        });

        console.log("Data sent to backend:", response.data);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    };

    sendDataToBackend();
  }, [course_code, average, completionRate, level, studentCount, studentCountActive]);

  return (
    <div style={{ fontWeight: '600' }} className="class-average-summary-card">
    <div className="class-pgf-average-column">
    <div><strong>{average.toFixed(2)}</strong></div>
    <div>PGF Average</div>
    </div>
    <div className="class-completion-rate-column">
    <div><strong>{completionRate}%</strong></div>
    <div>Completion Rate</div>
    </div>
    <div className="class-proficiency-level-column">
    <div style={{ color: color }}><strong>{level}</strong></div>
    <div>Proficiency</div>
    </div>
    </div>
  );
};

export default ClassAverageSummary;
