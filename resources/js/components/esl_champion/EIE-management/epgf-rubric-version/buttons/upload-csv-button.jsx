import React from 'react';

const UploadCSVButton = ({ label, rightSpacing, onFileUpload, className }) => {
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file); // Pass the uploaded file to the parent component
    }
    event.target.value = null; // Reset the input value to allow re-uploading the same file
  };

  return (
    <div style={{ position: 'relative' }} className={className}>
    <button
    style={buttonStyles(rightSpacing)}
    onClick={handleButtonClick}
    aria-label={label} // Accessibility enhancement
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

const buttonStyles = (rightSpacing) => ({
  marginTop: '15px',
  width: '150px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#DC2626',
  color: '#FFFFFF',
  fontSize: '15px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  position: 'absolute',
  right: rightSpacing || '0',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

export default UploadCSVButton;
