import React from 'react';

const SubmitButton = ({ onClick }) => {
  const label = "Submit";

  return (
    <button style={styles.button} onClick={onClick}>
    {label}
    </button>
  );
};

const styles = {
  button: {
    width: '100px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#0187F1',
    color: '#FFFFFF',
    fontSize: '15px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    display: 'inline-block',
  },
};

export default SubmitButton;
