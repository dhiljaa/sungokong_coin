import React from 'react';

const SortSelector = ({ sortOption, setSortOption }) => {
  return (
    <select
      value={sortOption}
      onChange={e => setSortOption(e.target.value)}
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
      aria-label="Select sorting option"
    >
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="market_cap_asc">Market Cap: Low to High</option>
      <option value="market_cap_desc">Market Cap: High to Low</option>
    </select>
  );
};

export default SortSelector;
