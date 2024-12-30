import React from "react";
import ESLSidebar from '../../sidebar/esl-sidebar';
import UserInfo from '@user-info/User-info';
import EPGFrubricVersionDropdown from "./dropdown-button/epgf-rubric-version-dropdown";
import Table from "./table/epgf-rubric-table";
import UploadCSVButton from "./buttons/upload-csv-button";

const eslPrimeEPGFRubricVersion = () => {
  // Define the handleFileUpload function
  const handleFileUpload = (file) => {
    console.log("Uploaded File:", file);
    // Implement the file upload logic here
    // Example: Send the file to the backend
    const formData = new FormData();
    formData.append("file", file);

    // Replace with your API endpoint
    fetch("/api/upload-csv", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("File uploaded successfully:", data);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
  };

  return (
    <div>
    <ESLSidebar />
    <UserInfo />
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-page-title">
          <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800 }}>
          EPGF Rubric Version
          </h1>
        </div>
      </div>
    </div>
    <EPGFrubricVersionDropdown />
    <br />
    <Table />
    <h1>Upload CSVs</h1>
    <div style={{ display: 'flex', gap: '180px', marginTop: '15px', justifyContent: 'flex-end' }}>
    <UploadCSVButton
    label="Upload Pronunciation"
    onFileUpload={handleFileUpload}
    />
    <UploadCSVButton
    label="Upload Grammar"
    onFileUpload={handleFileUpload}
    />
    <UploadCSVButton
    label="Upload Fluency"
    onFileUpload={handleFileUpload}
    />
    </div>

    <br /><br /><br /><br />
    </div>
  );
};

export default eslPrimeEPGFRubricVersion;
