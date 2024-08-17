import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { lightTheme, darkTheme } from '../styles/theme';
import TimeComponent from './TimeComponent';
import { fetchTimeValue } from './api';
import TimeSlider from './TimeSlider';
import TimezoneList from './TimezoneList';
import DatePicker from './DatePicker';
import DarkModeToggle from './DarkModeToggle';
import ScheduleMeetButton from './ScheduleMeet';

const App = () => {
  const [utcTime, setUtcTime] = useState(0);
  const [timezones, setTimezones] = useState(['UTC', 'Asia/Kolkata']);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const [newTimezone, setNewTimezone] = useState('');
  const [timeValue, setTimeValue] = useState(null);

  useEffect(() => {
    const getTimeValue = async () => {
      const fetchedTimeValue = await fetchTimeValue();
      setTimeValue(fetchedTimeValue);
    };
    getTimeValue();
  }, []);

  const addTimezone = (timezone) => {
    if (timezone && !timezones.includes(timezone)) {
      setTimezones([...timezones, timezone]);
      setNewTimezone(''); // Reset input field
    }
  };

  const removeTimezone = (timezone) => setTimezones(timezones.filter(tz => tz !== timezone));
  const reorderTimezones = (newOrder) => setTimezones(newOrder);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleAddTimezone = () => {
    addTimezone(newTimezone);
  };

  if (!timeValue) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <TimeComponent timeValue={timeValue} />
      <div>
        <h1>Time Zone Converter</h1>
        <TimeSlider utcTime={utcTime} onTimeChange={setUtcTime} />
        <TimezoneList 
          timezones={timezones} 
          utcTime={utcTime} 
          onRemove={removeTimezone} 
          onReorder={reorderTimezones} 
        />
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <button onClick={() => setTimezones([...timezones].reverse())}>Reverse Order</button>
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
        <ScheduleMeetButton utcTime={utcTime} timezones={timezones} />
        <input
          type="text"
          value={newTimezone}
          onChange={(e) => setNewTimezone(e.target.value)}
          placeholder="Enter new timezone"
        />
        <button onClick={handleAddTimezone}>Add Timezone</button>
      </div>
    </ThemeProvider>
  );
};

export default App;
