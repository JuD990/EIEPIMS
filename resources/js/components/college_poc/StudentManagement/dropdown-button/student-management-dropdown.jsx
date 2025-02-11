import React, { useState, useEffect } from "react";
import "./student-management-dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const StudentManagementDropdown = ({ searchQuery, setSearchQuery }) => {
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

  useEffect(() => {
    if (selectedSubject) {
      setSelectedCode(subjectCodes[selectedSubject][0]);
    }
  }, [selectedSubject]);

  const currentCodeOptions = subjectCodes[selectedSubject] || [];

  return (
    <div className="student-dropdown-container" style={{ display: 'flex', alignItems: 'center' }}>
    {/* Subject Dropdown */}
    <div className="student-dropdown-wrapper">
    <button className="student-dropdown-btn" onClick={() => setIsSubjectOpen((prev) => !prev)}>
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
          setSelectedCode(subjectCodes[subject][0]);
          setIsSubjectOpen(false);
          setIsCodeOpen(true);
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
    <button className="student-dropdown-btn" onClick={() => setIsCodeOpen((prev) => !prev)}>
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

    {/* Search Input */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginRight: '35px' }}>
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search student"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      border: '1px solid #333333', // Ensure border appears properly
      paddingLeft: '10px',
      fontSize: '16px',
      outline: 'none', // Optional: Removes the default blue outline
    }}
    />
    </div>

    </div>
  );
};

export default StudentManagementDropdown;
