import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button onClick={toggleDarkMode} className="p-2 border rounded">
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default DarkModeToggle;