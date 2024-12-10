import React from 'react';
import PropTypes from 'prop-types';

const UploadCSVButton = ({ label, rightSpacing = '20px', onFileUpload }) => {
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file); // Pass the uploaded file to the parent component
    }
    event.target.value = ''; // Reset the input value to allow re-uploading the same file
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{ ...styles.button, right: rightSpacing }}
        onClick={handleButtonClick}
      >
        {label}
      </button>
      <input
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

const styles = {
  button: {
    marginTop: '15px',
    width: '150px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: '#0187F1',
    color: '#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    border: '2px solid #0187F1',
    position: 'absolute',
    right: '0',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

UploadCSVButton.propTypes = {
  label: PropTypes.string.isRequired,
  rightSpacing: PropTypes.string,
  onFileUpload: PropTypes.func.isRequired,
};

export default UploadCSVButton;
