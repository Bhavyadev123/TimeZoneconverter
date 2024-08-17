import React from 'react';

const DarkModeToggle = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default DarkModeToggle;
