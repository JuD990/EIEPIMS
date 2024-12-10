import React, { useState } from 'react';
import Papa from 'papaparse';
import './upload-csv-class-list.css';

const UploadClassListButton = () => {

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);  // Store CSV data
          setIsCsvUploaded(true);
          alert('CSV File Parsed Successfully');
        },
        header: true, // Treat first row as header
        skipEmptyLines: true, // Skip empty lines
      });
    }
  };

  return (
    <div className="class-list-buttons-container">
      <div className="class-list-buttons">
        {/* Upload CSV Button */}
        <div className='class-list-upload-csv-button'>
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="csv-upload">
            Upload CSV
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadClassListButton;
