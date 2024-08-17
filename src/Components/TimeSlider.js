import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const TimeSlider = ({ utcTime, onTimeChange }) => {
  const handleSliderChange = (value) => {
    onTimeChange(value);
  };

  return (
    <Slider
      min={-720}
      max={720}
      value={utcTime}
      onChange={handleSliderChange}
    />
  );
};

export default TimeSlider;
