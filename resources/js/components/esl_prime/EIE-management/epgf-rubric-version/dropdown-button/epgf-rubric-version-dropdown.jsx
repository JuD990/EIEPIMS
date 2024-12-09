import React, { useState } from "react";
import "./epgf-rubric-version-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const EPGFrubricVersionDropdown = () => {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("EPGF Rubric v1.0");
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("Pronunciation");

  const implementingSubjects = ["EPGF Rubric v1.0", "EPGF Rubric v2.0", "EPGF Rubric v3.0"];
  const subjectCodes = ["Pronunciation", "Grammar", "Fluency"];

  const handleSetDefault = () => {
    // Append an asterisk to the selected subject if it's not already there
    if (!selectedSubject.endsWith("*")) {
      setSelectedSubject(selectedSubject + "*");
    }
  };

  const handleSubjectSelect = (subject) => {
    // Select a new subject and remove the asterisk if it was added
    if (selectedSubject !== subject) {
      setSelectedSubject(subject);
    }
    setIsSubjectOpen(false);
  };

  return (
    <div className="student-dropdown-container">
      {/* Flex container for dropdowns and button */}
      <div className="dropdown-button-wrapper">
        {/* Subject Dropdown */}
        <div className="student-dropdown-wrapper">
          <button
            className="student-dropdown-btn"
            onClick={() => setIsSubjectOpen((prev) => !prev)}
          >
            {/* Display the selected subject with or without an asterisk */}
            <span>
              {selectedSubject.includes("*") ? (
                <>
                  {selectedSubject.slice(0, -1)}
                  <span className="asterisk">*</span>
                </>
              ) : (
                selectedSubject
              )}
            </span>
            <FaChevronDown className={`dropdown-arrow ${isSubjectOpen ? "open" : ""}`} />
          </button>
          {isSubjectOpen && (
            <div className="student-dropdown-menu">
              {implementingSubjects.map((subject) => (
                <div
                  key={subject}
                  className="student-dropdown-item"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  {subject}
                  {/* Display the asterisk for the current default selection */}
                  {selectedSubject === subject + "*" && (
                    <span className="asterisk">*</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Set Default Button */}
        <button
          className="set-default-btn"
          onClick={handleSetDefault}
        >
          Set Default
        </button>

        {/* Subject Code Dropdown */}
        <div className="code-dropdown-wrapper">
          <button
            className="student-dropdown-btn"
            onClick={() => setIsCodeOpen((prev) => !prev)}
          >
            {selectedCode}
            <FaChevronDown className={`dropdown-arrow ${isCodeOpen ? "open" : ""}`} />
          </button>
          {isCodeOpen && (
            <div className="code-dropdown-menu">
              {subjectCodes.map((code) => (
                <div
                  key={code}
                  className="code-dropdown-item"
                  onClick={() => {
                    setSelectedCode(code);
                    setIsCodeOpen(false);
                  }}
                >
                  {code}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EPGFrubricVersionDropdown;
