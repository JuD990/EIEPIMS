import React, { useRef, useState } from "react";
import axios from "axios";
import "./UploadImplementingSubjectsButton.css";
import uploadLogo from "@assets/Upload.png";
import classListLogo from "@assets/Upload.png";

const UploadingButton = () => {
  const subjectFileInputRef = useRef(null);
  const classListFileInputRef = useRef(null);
  const [subjectLoading, setSubjectLoading] = useState(false);
  const [classListLoading, setClassListLoading] = useState(false);

  // Handle button click for uploading subjects
  const handleSubjectButtonClick = () => {
    subjectFileInputRef.current.click();
  };

  // Handle button click for uploading class list
  const handleClassListButtonClick = () => {
    classListFileInputRef.current.click();
  };

  // Handle file change for subjects
  const handleSubjectFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSubjectLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload-subjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Subject file uploaded successfully!");
      console.log(response.data);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error uploading subject file:", error.response?.data || error.message);
      alert("Failed to upload subject file.");
    } finally {
      setSubjectLoading(false);
      event.target.value = ""; // Clear the file input after upload
    }
  };

  // Handle file change for class list
  const handleClassListFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setClassListLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload-class-list", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Class List uploaded successfully!");
      console.log(response.data);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error uploading class list:", error.response?.data || error.message);
      alert("Failed to upload class list.");
    } finally {
      setClassListLoading(false);
      event.target.value = ""; // Clear the file input after upload
    }
  };

  return (
    <div className="upload-buttons-container">
    {/* Upload Subject Button */}
    <button onClick={handleSubjectButtonClick} className="implementing-subjects-upload-button">
    {subjectLoading ? (
      <span>Uploading...</span>
    ) : (
      <>
      <img src={uploadLogo} alt="Upload Icon" className="upload-icon" />
      <span className="upload-label">Upload Subject</span>
      </>
    )}
    </button>
    <input
    type="file"
    accept=".csv, .xlsx, .xls"
    ref={subjectFileInputRef}
    onChange={handleSubjectFileChange}
    style={{ display: "none" }}
    />

    {/* Upload Class List Button */}
    <button onClick={handleClassListButtonClick} className="class-list-upload-button">
    {classListLoading ? (
      <span>Uploading...</span>
    ) : (
      <>
      <img src={classListLogo} alt="Class List Icon" className="upload-icon" />
      <span className="upload-label">Upload Class List</span>
      </>
    )}
    </button>
    <input
    type="file"
    accept=".csv, .xlsx, .xls"
    ref={classListFileInputRef}
    onChange={handleClassListFileChange}
    style={{ display: "none" }}
    />
    </div>
  );
};

export default UploadingButton;
