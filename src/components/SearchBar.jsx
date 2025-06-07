import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ search, setSearch }) => (
  <div className="relative w-full">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search coins..."
      aria-label="Search coins"
      className="
        w-full
        pl-10 pr-4 py-3
        rounded-lg
        border
        border-gray-300
        bg-white
        text-gray-900
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent
        transition
        placeholder-gray-400
        dark:bg-gray-800
        dark:text-white
        dark:placeholder-gray-500
        dark:border-gray-600
        dark:focus:ring-blue-400
      "
    />
  </div>
);

export default SearchBar;
