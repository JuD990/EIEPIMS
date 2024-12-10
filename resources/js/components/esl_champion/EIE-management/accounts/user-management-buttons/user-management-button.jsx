import React, { useState } from 'react';
import Papa from 'papaparse';
import './user-management-buttons.css';

const UserManagementButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
    <div className="user-management-buttons-container">
      <div className="user-management-buttons">
        {/* Upload CSV Button */}
        <div className='upload-csv-button'>
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

        {/* Add Account Button */}
        <button className="add-account-button" onClick={handleOpenModal}>
          Add Account
        </button>
      </div>

      {/* Display CSV data if uploaded */}
      {isCsvUploaded && (
        <div className="csv-data-preview">
          <h3>Uploaded CSV Data:</h3>
          <pre>{JSON.stringify(csvData, null, 2)}</pre> {/* Display the parsed data */}
        </div>
      )}

      {/* Modal for Add Account */}
      {isModalOpen && (
        <div className="form-modal">
          <div className="form-container">
            <h2>Add Account</h2>
            <form>
              <label>First Name</label>
              <input type="text" name="firstName" required />

              <label>Middle Name</label>
              <input type="text" name="middleName" required />

              <label>Last Name</label>
              <input type="text" name="lastName" required />

              <label>Student ID</label>
              <input type="text" name="studentId" required />

              <label>Email</label>
              <input type="email" name="email" required />

              <label>Department</label>
              <input type="text" name="department" required />

              <label>Program</label>
              <input type="text" name="program" required />

              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementButtons;
