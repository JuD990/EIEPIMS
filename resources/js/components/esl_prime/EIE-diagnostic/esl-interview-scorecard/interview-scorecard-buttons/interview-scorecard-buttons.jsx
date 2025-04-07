import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import "./interview-scorecard-buttons.css";

const InterviewScorecardButtons = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setCurrentDate(formattedDate);

        const formattedTime = today.toTimeString().slice(0, 5);
        setCurrentTime(formattedTime);
    }, []);
    return (

        <div>
        <h2>INTERVIEW SCORECARD</h2>
        <div className="esl-interview-scorecard-form-container">
        {/* First Column */}
        <div className="esl-interview-scorecard-column">
        <div className="esl-interview-scorecard-form-name">
        <label>Name:</label>
        <div className="esl-dropdown-container-name">
        <select className="esl-interview-scorecard-select-name">
        <option value="">Select Name</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
        <option value="Michael Johnson">Michael Johnson</option>
        <option value="Emily Davis">Emily Davis</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
        <option value="Michael Johnson">Michael Johnson</option>
        <option value="Emily Davis">Emily Davis</option>
        </select>
        </div>
        </div>

        <div className="esl-interview-scorecard-form-interviewer">
        <label>Interviewer:</label>
        <input
        type="text"
        placeholder="Enter interviewer's name"
        className="esl-interview-scorecard-input"
        />
        </div>

        <div className="esl-interview-scorecard-form-venue">
        <label>Venue:</label>
        <input
        type="text"
        placeholder="Enter venue"
        className="esl-interview-scorecard-input"
        />
        </div>
        </div>

        {/* Second Column */}
        <div className="esl-interview-scorecard-column">
        <div className="esl-interview-scorecard-form-department">
        <label>Department:</label>
        <select className="esl-interview-scorecard-select-department">
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        </select>
        </div>

        <div className="esl-interview-scorecard-form-date">
        <label>Date:</label>
        <div className="esl-interview-scorecard-input-icon">
        <input
        type="date"
        className="esl-interview-scorecard-input"
        value={currentDate}
        readOnly
        />
        <FontAwesomeIcon
        icon={faCalendarAlt}
        className="esl-interview-scorecard-icon"
        />
        </div>
        </div>

        <div className="esl-interview-scorecard-form-time">
        <label>Time:</label>
        <div className="esl-interview-scorecard-input-icon">
        <input
        type="time"
        className="esl-interview-scorecard-input"
        value={currentTime}
        readOnly
        />
        <FontAwesomeIcon
        icon={faClock}
        className="esl-interview-scorecard-icon"
        />
        </div>
        </div>
        </div>

        {/* Buttons Row */}
        <div className="esl-buttons-rating">
        <button className="esl-no-show-button">Tagged as “No Show”</button>
        <div className="esl-interview-scorecard-buttons-row">
        <button className="esl-clear-button">Clear</button>
        <button className="esl-save-button">Save</button>
        </div>

        {/* Box for Average Rating */}
        <div className="esl-average-rating-box">
        <label>Average Rating:</label>
        </div>
        </div>
        </div>
        </div>

    );
};

export default InterviewScorecardButtons;
