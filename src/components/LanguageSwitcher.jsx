import React from 'react';

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={e => setLanguage(e.target.value)}
      className="
        p-2
        rounded-md
        bg-white
        dark:bg-gray-700
        text-gray-800
        dark:text-gray-200
        border
        border-gray-300
        dark:border-gray-600
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
        transition
        duration-200
        hover:bg-indigo-50
        dark:hover:bg-indigo-900
        cursor-pointer
      "
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="id">Indonesia</option>
      <option value="ar">العربية</option> {/* Bahasa Arab */}
    </select>
  );
};

export default LanguageSwitcher;
