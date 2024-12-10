import React, { useState } from "react";
import "./master-class-list-dropdown.css";
import { FaChevronDown } from "react-icons/fa";
import Papa from "papaparse";
import UploadIcon from "@assets/Upload.png"

const MasterClassListDropdown = () => {
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("BSIT");

  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);
  const [selectedYearLevel, setSelectedYearLevel] = useState("1st Year");

  const programs = ["BSIT", "BSCS", "BLIS", "ACT"];
  const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="eie-head-dropdown-container" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {/* Program Dropdown */}
      <div className="eie-head-dropdown-wrapper">
        <button
          className="eie-head-dropdown-btn"
          onClick={() => setIsProgramOpen((prev) => !prev)}
        >
          {selectedProgram}
          <FaChevronDown className={`eie-head-dropdown-arrow ${isProgramOpen ? "open" : ""}`} />
        </button>
        {isProgramOpen && (
          <div className="eie-head-dropdown-menu">
            {programs.map((program, index) => (
              <p
                key={index}
                className={`eie-head-dropdown-item ${selectedProgram === program ? "eie-head-selected" : ""}`}
                onClick={() => {
                  setSelectedProgram(program);
                  setIsProgramOpen(false);
                }}
              >
                {program}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Year Level Dropdown */}
      <div className="eie-head-dropdown-wrapper">
        <button
          className="eie-head-dropdown-btn"
          onClick={() => setIsYearLevelOpen((prev) => !prev)}
        >
          {selectedYearLevel}
          <FaChevronDown className={`eie-head-dropdown-arrow ${isYearLevelOpen ? "open" : ""}`} />
        </button>
        {isYearLevelOpen && (
          <div className="eie-head-dropdown-menu">
            {yearLevels.map((level, index) => (
              <p
                key={index}
                className={`eie-head-dropdown-item ${selectedYearLevel === level ? "eie-head-selected" : ""}`}
                onClick={() => {
                  setSelectedYearLevel(level);
                  setIsYearLevelOpen(false);
                }}
              >
                {level}
              </p>
            ))}
          </div>
        )}
      </div>
        {/* Right side Search Area */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          style={{
            width: '476px',
            height: '60px',
            borderRadius: '8px',
            borderColor: '#333333',
            paddingLeft: '10px',
            fontSize: '16px',
            marginLeft: 'auto',
            marginRight: '35px',
          }}
        />
    </div>
  );
};

export default MasterClassListDropdown;
