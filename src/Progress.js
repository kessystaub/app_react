import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const CustomProgressBar = ({ progress }) => {
    return (
      <ProgressBar animated now={progress} label={`${progress}%`} />
    );
  };

export default CustomProgressBar;