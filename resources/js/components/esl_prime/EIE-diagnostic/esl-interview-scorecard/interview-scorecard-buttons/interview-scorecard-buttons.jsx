import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const InterviewScorecardButtons = ({
    overallAverage,
    onClear,
    ratings,
    remarks,
    categoryAverages
}) => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [departments, setDepartments] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        student_id: "",
        yearLevel: "",
        interviewer: "",
        venue: "",
        program: "",
        department: "",
        date: currentDate,
        time: currentTime,
    });

    const filteredStudents = students.filter((student) => {
        const fullName = `${student.firstname} ${student.middlename || ""} ${student.lastname}`.toLowerCase();
        return fullName.includes(nameSearch.toLowerCase());
    });

    const handleStudentSelect = (fullName) => {
        const selectedStudent = students.find(student =>
        `${student.firstname} ${student.middlename || ""} ${student.lastname}`.trim() === fullName
        );

        if (selectedStudent) {
            setFormData(prev => ({
                ...prev,
                name: fullName,
                student_id: selectedStudent.student_id,
                program: selectedStudent.program,
                year_level: selectedStudent.year_level,
            }));
        }
        setIsDropdownOpen(false);
        setNameSearch("");
    };


    useEffect(() => {
        const fetchStudents = async () => {
            if (formData.department && formData.yearLevel) {
                try {
                    const response = await axios.get("http://localhost:8000/api/master-class-list-students", {
                        params: {
                            department: formData.department,
                            yearLevel: formData.yearLevel,
                        }
                    });
                    const studentsList = response.data;  // Array of students returned from backend
                    console.log(studentsList);
                    setStudents(studentsList);  // Update the students state
                } catch (error) {
                    console.error("Error fetching students:", error);
                }
            }
        };

        fetchStudents();
    }, [formData.department, formData.yearLevel]);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setCurrentDate(formattedDate);
        setFormData(prev => ({ ...prev, date: formattedDate }));

        const formattedTime = today.toTimeString().slice(0, 5);
        setCurrentTime(formattedTime);
        setFormData(prev => ({ ...prev, time: formattedTime }));
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/master-class-list-department");
                const departmentList = Array.isArray(response.data) ? response.data : [];
                setDepartments(departmentList);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStudentChange = (e) => {
        const selectedName = e.target.value;
        const selectedStudent = students.find(
            (student) => `${student.firstname} ${student.middlename ? student.middlename : ""} ${student.lastname}`.trim() === selectedName
        );

        if (selectedStudent) {
            console.log("Selected Student Object:", selectedStudent);  // Log the selected student object

            setFormData((prev) => {
                const updatedFormData = {
                    ...prev,
                    name: selectedName,
                    student_id: selectedStudent.student_id,
                    program: selectedStudent.program,
                    year_level: selectedStudent.year_level,
                };
                console.log("Updated Form Data:", updatedFormData);  // Log the updated form data
                return updatedFormData;
            });
        } else {
            console.log("No student found with the selected name.");
        }
    };


    const collectAllInputs = () => {
        return {
            ...formData,  // Spread in all form fields
            date_of_interview: currentDate, // Current date from frontend
            time_of_interview: currentTime, // Current time from frontend
            year_level: formData.yearLevel,  // Corrected reference
        };
    };

    const remarksData = () => {
        return remarks;  // Directly return the remarks object instead of an object with a `remarks` property
    }

    const handleSave = async () => {
        // Check if required fields are empty
        const { department, yearLevel, name } = formData;
        if (!department || !yearLevel || !name) {
            alert("Please select Department, Year Level, and Name before saving.");
            return;
        }

        // Check if any of the critical rating fields are empty
        if (!ratings.Consistency?.descriptor || ratings.Consistency?.rating === undefined ||
            !ratings.Clarity?.descriptor || ratings.Clarity?.rating === undefined ||
            !ratings.Articulation?.descriptor || ratings.Articulation?.rating === undefined ||
            !ratings["Intonation & Stress"]?.descriptor || ratings["Intonation & Stress"]?.rating === undefined ||
            !ratings.Accuracy?.descriptor || ratings.Accuracy?.rating === undefined ||
            !ratings["Clarity of Thought"]?.descriptor || ratings["Clarity of Thought"]?.rating === undefined ||
            !ratings.Syntax?.descriptor || ratings.Syntax?.rating === undefined) {
            alert("Please fill in all rating fields before saving.");
        return;
            }

            // Check if any of the remarks are empty
            if (!remarks?.["PGF Specific Remarks"] || !remarks?.["School Year Highlight"] || !remarks?.["School Year Lowlight"] ||
                !remarks?.["SPARK Highlight"] || !remarks?.["SPARK Lowlight"] || !remarks?.["Usage in School/Online (When in School)"] ||
                !remarks?.["Usage Offline (Home or Outside)"] || !remarks?.["Support Needed"]) {
                alert("Please provide all remarks before saving.");
            return;
                }

                // Collect all necessary data for submission
                const collectedData = {
                    ...collectAllInputs(), // Spread in all other collected inputs
                    consistency_descriptor: ratings.Consistency?.descriptor || 'No description provided',
                    consistency_rating: ratings.Consistency?.rating ?? 0,
                    clarity_descriptor: ratings.Clarity?.descriptor || 'No description provided',
                    clarity_rating: ratings.Clarity?.rating ?? 0,
                    articulation_descriptor: ratings.Articulation?.descriptor || 'No description provided',
                    articulation_rating: ratings.Articulation?.rating ?? 0,
                    intonation_and_stress_descriptor: ratings["Intonation & Stress"]?.descriptor || 'No description provided',
                    intonation_and_stress_rating: ratings["Intonation & Stress"]?.rating ?? 0,
                    accuracy_descriptor: ratings.Accuracy?.descriptor || 'No description provided',
                    accuracy_rating: ratings.Accuracy?.rating ?? 0,
                    clarity_of_thought_descriptor: ratings["Clarity of Thought"]?.descriptor || 'No description provided',
                    clarity_of_thought_rating: ratings["Clarity of Thought"]?.rating ?? 0,
                    syntax_descriptor: ratings.Syntax?.descriptor || 'No description provided',
                    syntax_rating: ratings.Syntax?.rating ?? 0,
                    grammar_average: categoryAverages?.Grammar ?? 0,
                    pronunciation_average: categoryAverages?.Pronunciation ?? 0,
                    fluency_average: categoryAverages?.Fluency ?? 0,
                    quality_of_response_descriptor: ratings["Quality of Response"]?.descriptor || 'No description provided',
                    quality_of_response_rating: ratings["Quality of Response"]?.rating ?? 0,
                    detail_of_response_descriptor: ratings["Detail of Response"]?.descriptor || 'No description provided',
                    detail_of_response_rating: ratings["Detail of Response"]?.rating ?? 0,
                    "pgf_specific_remarks": remarks?.["PGF Specific Remarks"] || 'No description provided',
                    "school_year_highlight": remarks?.["School Year Highlight"] || 'No description provided',
                    "school_year_lowlight": remarks?.["School Year Lowlight"] || 'No description provided',
                    "spark_highlight": remarks?.["SPARK Highlight"] || 'No description provided',
                    "spark_lowlight": remarks?.["SPARK Lowlight"] || 'No description provided',
                    "usage_in_school_online": remarks?.["Usage in School/Online (When in School)"] || 'No description provided',
                    "usage_offline": remarks?.["Usage Offline (Home or Outside)"] || 'No description provided',
                    "support_needed": remarks?.["Support Needed"] || 'No description provided',
                    average_pgf_rating: overallAverage ?? 0,
                    show_status: 'Showed Up', // Default value for show_status
                };

                console.log('Data to be sent to backend:', collectedData);

                try {
                    const response = await axios.post('/api/eie-diagnostic-reports', collectedData);
                    console.log('Saved:', response.data);
                    alert("Data has been successfully saved!");  // Success alert
                } catch (error) {
                    console.error('Error saving:', error.response?.data || error);
                    alert("There was an error saving the data.");  // Error alert
                }
    };

    // Handle the onClear functionality
    const handleClear = () => {
        setFormData({
            name: "",
            student_id: "",
            interviewer: "",
            venue: "",
            department: "",
            yearLevel: "",
        });
        onClear(); // Calling onClear passed as prop
    };

    const handleNoShow = async () => {
        const { department, yearLevel, name } = formData;

        // Check if any of the required fields are missing
        if (!department || !yearLevel || !name) {
            alert("Please select Department, Year Level, and Name before tagging as 'No Show'.");
            return;
        }

        // Collect necessary data and add 'No Show' status
        const collectedData = {
            ...collectAllInputs(),
            show_status: 'No Show',
        };

        try {
            const response = await axios.post('/api/eie-diagnostic-reports', collectedData);
            console.log('No Show tagged:', response.data);
            alert("No Show has been successfully tagged!");  // Add success alert here
        } catch (error) {
            console.error('Error tagging No Show:', error.response?.data || error);
            alert("There was an error tagging as 'No Show'.");  // Add error alert here
        }
    };


    return (
        <div>
        <h2>INTERVIEW SCORECARD</h2>
        <div className="esl-interview-scorecard-form-container">
        {/* First Column */}
        <div className="esl-interview-scorecard-column">
        {/* Name Dropdown */}
        <div className="esl-interview-scorecard-form-name">
        <label>Name:</label>
        <div className="custom-dropdown">
        <div className="custom-dropdown-selected" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {formData.name || "Select Name"}
        </div>

        {isDropdownOpen && (
            <div className="custom-dropdown-menu">
            <input
            type=""
            className="custom-dropdown-search"
            placeholder="Search name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            />
            <div className="custom-dropdown-options">
            {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => {
                    const fullName = `${student.firstname} ${student.middlename || ""} ${student.lastname}`.trim();
                    return (
                        <div
                        key={idx}
                        className="custom-dropdown-option"
                        onClick={() => handleStudentSelect(fullName)}
                        >
                        {fullName}
                        </div>
                    );
                })
            ) : (
                <div className="custom-dropdown-option disabled">No students found</div>
            )}
            </div>
            </div>
        )}
        </div>
        </div>

        {/* Interviewer Input */}
        <div className="esl-interview-scorecard-form-interviewer">
        <label>Interviewer:</label>
        <input
        type=""
        placeholder="Enter interviewer's name"
        className="esl-interview-scorecard-input"
        name="interviewer"
        value={formData.interviewer}
        onChange={handleInputChange}
        />
        </div>

        {/* Venue Input */}
        <div className="esl-interview-scorecard-form-venue">
        <label>Venue:</label>
        <input
        type=""
        placeholder="Enter venue"
        className="esl-interview-scorecard-input"
        name="venue"
        value={formData.venue}
        onChange={handleInputChange}
        />
        </div>
        </div>

        {/* Second Column */}
        <div className="esl-interview-scorecard-column">
        {/* Department Dropdown */}
        <div className="esl-interview-scorecard-form-department">
        <label>Department:</label>
        <select
        className="esl-interview-scorecard-select-department"
        name="department"
        value={formData.department}
        onChange={handleInputChange}
        >
        <option value="">Select Department</option>
        {departments.map((dept, idx) => (
            <option key={idx} value={dept}>
            {dept}
            </option>
        ))}
        </select>
        </div>

        <div className="esl-interview-scorecard-form-year-level">
        <label>Year Level:</label>
        <select
        className="esl-interview-scorecard-select-year-level"
        name="yearLevel"
        value={formData.yearLevel}
        onChange={handleInputChange}
        >
        <option value="">Select Year Level</option>
        <option value="1st Year">Freshmen</option>
        <option value="4th Year">Graduating</option>
        </select>
        </div>

        {/* Date */}
        <div className="esl-interview-scorecard-form-date">
        <label>Date:</label>
        <div className="esl-interview-scorecard-input-icon">
        <input
        type="date"
        className="esl-interview-scorecard-input"
        value={formData.date}
        readOnly
        />
        <FontAwesomeIcon
        icon={faCalendarAlt}
        className="esl-interview-scorecard-icon"
        />
        </div>
        </div>

        {/* Time */}
        <div className="esl-interview-scorecard-form-time">
        <label>Time:</label>
        <div className="esl-interview-scorecard-input-icon">
        <input
        type="time"
        className="esl-interview-scorecard-input"
        value={formData.time}
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
        <button className="esl-no-show-button" onClick={handleNoShow}>Tagged as “No Show”</button>
        <div className="esl-interview-scorecard-buttons-row">
        <button className="esl-clear-button" onClick={handleClear}>
        Clear
        </button>
        <button className="esl-save-button" onClick={handleSave}>
        Save
        </button>
        </div>

        {/* Average Rating */}
        <div className="esl-average-rating-box">
        <label>Average Rating: {overallAverage}</label>
        </div>
        </div>
        </div>
        </div>
    );
};

export default InterviewScorecardButtons;
