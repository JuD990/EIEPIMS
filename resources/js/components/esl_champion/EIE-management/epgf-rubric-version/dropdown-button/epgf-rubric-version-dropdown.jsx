import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./epgf-rubric-version-dropdown.css";

const EPGFrubricVersionDropdown = () => {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [rubricVersions, setRubricVersions] = useState([]);
  const [rubricDetails, setRubricDetails] = useState({
    pronunciation: {},
    grammar: {},
    fluency: {},
  });

  useEffect(() => {
    // Fetch rubric versions from the backend API
    const fetchRubricVersions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/rubric-versions");
        const data = await response.json();
        setRubricVersions(data.map((item) => item.version)); // Extract the version field
        if (data.length > 0) {
          const activeVersion = data.find((item) => item.version.includes("*"));
          setSelectedSubject(
            `EPGF Rubric ${activeVersion ? activeVersion.version : data[0].version}`
          );
        }
      } catch (error) {
        console.error("Error fetching rubric versions:", error);
      }
    };

    fetchRubricVersions();
  }, []);

  const fetchRubricDetails = async (version) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/get-rubric-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ version: version }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
      } else {
        console.error('Expected JSON response but received:', contentType);
      }
    } catch (error) {
      console.error('Failed to fetch rubric details:', error);
    }
  };


  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setIsSubjectOpen(false);
    const cleanedVersion = subject.replace("EPGF Rubric ", "").replace("*", "");
    fetchRubricDetails(cleanedVersion);
  };

  const handleSetDefault = async () => {
    const cleanedVersion = selectedSubject.replace("EPGF Rubric ", "").replace("*", "");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/set-default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ version: cleanedVersion }),
      });

      if (response.ok) {
        const updatedVersion = cleanedVersion + "*";
        setSelectedSubject(`EPGF Rubric ${updatedVersion}`);
        setRubricVersions((prevVersions) =>
        prevVersions.map((version) =>
        version === cleanedVersion ? updatedVersion : version.replace("*", "")
        )
        );

        window.location.reload();
      } else {
        console.error("Failed to set default:", await response.text());
      }
    } catch (error) {
      console.error("Error setting default:", error);
    }
  };


  return (
    <div className="epgf-rubric-student-dropdown-container">
    <div className="dropdown-button-wrapper">
    <div className="student-dropdown-wrapper">
    <button
    className="epgf-rubric-student-dropdown-btn"
    onClick={() => setIsSubjectOpen((prev) => !prev)}
    >
    <span>
    {selectedSubject.includes("*") ? (
      <>
      {selectedSubject.slice(0, -1)}
      <span style={{ color: "red" }}>*</span>
      </>
    ) : (
      selectedSubject
    )}
    </span>
    <FaChevronDown
    className={`dropdown-arrow ${isSubjectOpen ? "open" : ""}`}
    />
    </button>
    {isSubjectOpen && (
      <div className="student-dropdown-menu">
      {rubricVersions.map((version) => (
        <div
        key={version} // Use the version directly as the key
        className="student-dropdown-item"
        onClick={() => handleSubjectSelect(`EPGF Rubric ${version}`)}
        >
        EPGF Rubric {version.includes("*") ? (
          <>
          {version.slice(0, -1)}
          <span style={{ color: "red" }}>*</span>
          </>
        ) : (
          version
        )}
        </div>
      ))}
      </div>
    )}
    </div>
    <button className="set-default-btn" onClick={handleSetDefault}>
    Set Default
    </button>
    </div>
    </div>
  );
};

export default EPGFrubricVersionDropdown;
