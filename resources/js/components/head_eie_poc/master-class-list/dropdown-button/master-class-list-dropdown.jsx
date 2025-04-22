import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import "./master-class-list-dropdown.css";

const MasterClassListDropdown = ({
  selectedProgram,
  setSelectedProgram,
  selectedYearLevel,
  setSelectedYearLevel,
  searchQuery,
  setSearchQuery,
}) => {
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [isYearLevelOpen, setIsYearLevelOpen] = useState(false);

  const [programs, setPrograms] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/implementing-subjects/specific-dropdown');
        if (response.status === 200) {
          const data = response.data;
          setPrograms(data.programs || []);
          setYearLevels(data.year_levels || []);
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchData();
  }, []);

  const handleResetFilters = () => {
    setSelectedProgram("");
    setSelectedYearLevel("");
    setSearchQuery("");
  };

  return (
    <div className="eie-head-dropdown-container">

    {/* Program Dropdown */}
    <div className="eie-head-dropdown-wrapper">
    <button
    className="eie-head-dropdown-btn"
    onClick={() => setIsProgramOpen((prev) => !prev)}
    >
    {selectedProgram || "Select Program"}
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
    {selectedYearLevel || "Select Year Level"}
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

    {/* Reset Filters */}
    <span
    onClick={handleResetFilters}
    style={{
      cursor: 'pointer',
      color: 'black',
      fontSize: '16px',
      marginLeft: '20px',
      alignSelf: 'center',
      textDecoration: 'underline',
    }}
    >
    Reset Filters
    </span>

    {/* Search Input */}
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
      marginLeft: '485px',
    }}
    />
    </div>
  );
};

export default MasterClassListDropdown;
