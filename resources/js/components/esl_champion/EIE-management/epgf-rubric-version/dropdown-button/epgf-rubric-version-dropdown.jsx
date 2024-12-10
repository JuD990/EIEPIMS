import React, { useState } from "react";
import "./epgf-rubric-version-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const EPGFrubricVersionDropdown = () => {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("EPGF Rubric v1.0");

  const implementingSubjects = ["EPGF Rubric v1.0", "EPGF Rubric v2.0", "EPGF Rubric v3.0"];

  const handleSetDefault = () => {
    // Append an asterisk to the selected subject if it's not already there
    if (!selectedSubject.endsWith("*")) {
      setSelectedSubject(selectedSubject + "*");
    }
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
      </div>
    </div>
  );
};

export default EPGFrubricVersionDropdown;
