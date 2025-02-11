import React, { useState, useEffect } from "react";
import "./student-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const StudentManagementDropdown = () => {
  // Initial state with pre-selected values
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Capstone 1");
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("ACT321K- KTa");

  const implementingSubjects = ["Capstone 1", "Information Assurance Security 1", "Specialization 1"];
  const subjectCodes = {
    "Capstone 1": ["ACT321K- KTa", "BLIS321K- KTb", "BSIT321K- KTc", "BSCS321K- KTc"],
    "Information Assurance Security 1": ["BSCS402K-Kra", "BSIT402K-Krb", "BLIS402K-Krc", "ACT402K-Krd"],
    "Specialization 1": ["BSIT413K-KTa", "BSCS413K-KTb", "BLIS413K-KTc", "ACT413K-KTd"],
  };

  // Ensure that the selected code is correctly set when the subject changes
  useEffect(() => {
    if (selectedSubject) {
      setSelectedCode(subjectCodes[selectedSubject][0]); // Set the default code for the selected subject
    }
  }, [selectedSubject]);

  const currentCodeOptions = subjectCodes[selectedSubject] || [];

  return (
    <div className="eie-head-student-dropdown-container">
      {/* Subject Dropdown */}
      <div className="student-dropdown-wrapper">
        <button
          className="student-dropdown-btn"
          onClick={() => setIsSubjectOpen((prev) => !prev)}
        >
          {selectedSubject}
          <FaChevronDown className={`dropdown-arrow ${isSubjectOpen ? "open" : ""}`} />
        </button>
        {isSubjectOpen && (
          <div className="student-dropdown-menu">
            {implementingSubjects.map((subject, index) => (
              <p
                key={index}
                className={`student-dropdown-item ${selectedSubject === subject ? "selected" : ""}`}
                onClick={() => {
                  setSelectedSubject(subject);
                  setSelectedCode(subjectCodes[subject][0]); // Set the first code of the new subject
                  setIsSubjectOpen(false);
                  setIsCodeOpen(true); // Automatically open code dropdown
                }}
              >
                {subject}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Subject Code Dropdown */}
      <div className="code-dropdown-wrapper">
        <button
          className="student-dropdown-btn"
          onClick={() => setIsCodeOpen((prev) => !prev)}
          disabled={selectedSubject === "Implementing Subjects"}
        >
          {selectedCode}
          <FaChevronDown className={`dropdown-arrow ${isCodeOpen ? "open" : ""}`} />
        </button>
        {isCodeOpen && (
          <div className="code-dropdown-menu">
            {currentCodeOptions.map((code, index) => (
              <p
                key={index}
                className={`code-dropdown-item ${selectedCode === code ? "selected" : ""}`}
                onClick={() => {
                  setSelectedCode(code);
                  setIsCodeOpen(false);
                }}
              >
                {code}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagementDropdown;
