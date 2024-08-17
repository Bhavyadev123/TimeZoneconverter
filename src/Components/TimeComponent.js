import React from 'react';
import { format } from 'date-fns';
const TimeComponent = ({ timeValue }) => {
    const date = new Date(timeValue);
  
    let formattedTime;
    try {
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      formattedTime = format(date, 'HH:mm:ss');
    } catch (error) {
      console.error('Error formatting time:', error);
      formattedTime = 'Invalid time'; // Fallback display
    }
  
    return <div>{formattedTime}</div>;
  };
  
  export default TimeComponent;