// src/components/GoHomeButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoHomeButton = ({ text = 'Go Home', style = {} }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '2rem' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: 10,
          background: '#A00000',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          width: '100%',
          cursor: 'pointer',
          ...style, // Allow overriding styles
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default GoHomeButton;
