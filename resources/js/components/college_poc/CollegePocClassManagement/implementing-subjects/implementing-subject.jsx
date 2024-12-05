import React, { useState } from "react";
import { Link } from 'react-router-dom';
import studentnoicon from "@assets/student-no.png";
import "./implementing-subject.css"

const implementingSubjects = () => {
  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  return (
    <div className="example-subjects">
    <Link to="/epgf-scorecard" className="subject-info">
      <div className="subject-1">
        <div className="combined-card">
          <div className="interior-card"></div>
          <div className="content">
            <div className="implementing-subject-1">
              <div className="subject-info">
                <p className="subject-name">Capstone 1</p>
                <div className="subject-info-1">
                  <p className="subject-code">BSIT321K- KTa</p>
                  <div className="student-number">
                    <img src={studentnoicon} alt="Student Number" />
                    <p>50</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="class-performance">
              <div className="eie-averages">
                <div className="pgf-average">
                  <p>2.00</p>
                  <p>PGF Average</p>
                </div>

                <div className="completion-rate">
                  <p>60%</p>
                  <p>Completion Rate</p>
                </div>

                <div className="proficiency-level">
                  <p style={{ color: 'green' }}>Approaching</p>
                  <p>Proficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
};

export default implementingSubjects;
