import React, { useRef } from "react";
import "./UploadImplementingSubjectsButton.css";
import uploadLogo from "@assets/Upload.png";

const UploadImplementingSubjectsButton = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      // Pass the uploaded file to the parent component via callback
      onFileUpload(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <div className="upload-implementing-subjects-button">
      <button onClick={handleButtonClick} className="implementing-subjects-upload-button">
        <img src={uploadLogo} alt="Upload Icon" className="upload-icon" />
        <span className="upload-label">Upload Subject</span>
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadImplementingSubjectsButton;
