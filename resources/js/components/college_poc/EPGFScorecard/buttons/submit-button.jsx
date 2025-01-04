import React from 'react';

const SubmitButton = () => {
  const label = "Submit";
  const rightSpacing = '20px';
  const onClick = () => { console.log("Button clicked"); };

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
    marginRight: '20px',
  },
};

export default SubmitButton;
