import React, { useState } from 'react';
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
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').filter(row => row.trim() !== ''); // Split rows and remove empty lines
        const headers = rows[0].split(','); // Assume first row contains headers
        const data = rows.slice(1).map(row => {
          const values = row.split(',');
          return headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index].trim();
            return acc;
          }, {});
        });
        setCsvData(data);
        setIsCsvUploaded(true);
        alert('CSV File Parsed Successfully');
      };
      reader.readAsText(file);
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
