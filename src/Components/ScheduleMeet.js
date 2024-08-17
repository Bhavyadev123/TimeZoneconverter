import React from 'react';

const ScheduleMeetButton = ({ utcTime, timezones }) => {
  const handleScheduleMeet = () => {
    const selectedTime = new Date(new Date().getTime() + utcTime * 60000);
    const eventTime = selectedTime.toISOString();
    
    const url = `https://calendar.google.com/calendar/r/eventedit?dates=${eventTime}/${eventTime}&text=Scheduled+Meeting&details=Meeting+Link&location=Online`;

    window.open(url, '_blank');
  };

  return (
    <button onClick={handleScheduleMeet}>
      Schedule Meet
    </button>
  );
};

export default ScheduleMeetButton;

