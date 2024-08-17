// api.js
export const fetchTimeValue = async () => {
    const response = await fetch('/api/time');
    const data = await response.json();
    const timeValue = new Date(data.time);
    if (isNaN(timeValue.getTime())) {
      console.error('Invalid time from API');
      return null; // Handle invalid time
    }
    return timeValue;
  };
  