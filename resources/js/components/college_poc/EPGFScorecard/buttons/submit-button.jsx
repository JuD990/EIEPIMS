import React from 'react';

const SubmitButton = ({ onClick, disabled }) => {
  const label = disabled ? "Submitted" : "Submit";

  return (
    <button
    style={{
      ...styles.button,
      backgroundColor: disabled ? '#A1A1AA' : '#DC2626',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
    onClick={onClick}
    disabled={disabled}
    >
    {label}
    </button>
  );
};

const styles = {
  button: {
    width: '100px',
    height: '40px',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '15px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    border: 'none',
    outline: 'none',
    display: 'inline-block',
  },
};

export default SubmitButton;
