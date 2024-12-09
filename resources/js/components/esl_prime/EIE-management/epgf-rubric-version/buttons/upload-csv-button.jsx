import React from 'react';
import PropTypes from 'prop-types';

const UploadCSVButton = ({ label, rightSpacing = '20px' }) => {
  return (
    <button style={{ ...styles.button, right: rightSpacing }}>
      {label}
    </button>
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
};

export default UploadCSVButton;
