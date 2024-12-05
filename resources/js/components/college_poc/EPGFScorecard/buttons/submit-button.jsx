import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ label, rightSpacing = '20px', onClick = () => {} }) => {
  return (
    <button style={{ ...styles.button, right: rightSpacing }} onClick={onClick}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    width: '150px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: '#0187F1',
    color: '#FFFFFF',
    fontSize: '23px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    position: 'absolute',
    right: '0',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  rightSpacing: PropTypes.string,
  onClick: PropTypes.func,
};

export default SubmitButton;
