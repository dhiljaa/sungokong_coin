import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const formatNumber = (value) => {
  if (!value && value !== 0) return '-';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

const CoinCard = ({ coin, className = '', onClick }) => {
  const priceChange = coin.price_change_percentage_24h ?? 0;
  const isPositive = priceChange >= 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onClick) onClick();
  };

  return (
    <div
      className={`flex flex-col items-center p-5 rounded-2xl shadow-md bg-white/30 dark:bg-gray-800/40 border border-white/10 dark:border-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-md cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${coin.name}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Coin Image */}
      <div className="w-20 h-20 mb-4 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-inner">
        <img
          src={coin.image}
          alt={`${coin.name} logo`}
          className="w-12 h-12 object-contain"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Coin Name */}
      <h2
        className="text-lg font-bold text-center text-gray-900 dark:text-white truncate w-full"
        title={coin.name}
      >
        {coin.name}
      </h2>

      {/* Current Price */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
        <span className="font-medium">Price:</span>{' '}
        <span className="text-green-600 dark:text-green-400">
          {formatNumber(coin.current_price)}
        </span>
      </p>

      {/* Market Cap */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="font-medium">Market Cap:</span>{' '}
        {formatNumber(coin.market_cap)}
      </p>

      {/* Price Change Bar */}
      <div
        className={`w-full h-1.5 mt-3 rounded-full ${
          isPositive ? 'bg-green-500' : 'bg-red-500'
        }`}
        title={`24h Change: ${priceChange.toFixed(2)}%`}
      ></div>

      {/* Price Change Value */}
      <div
        className={`mt-2 flex items-center text-sm font-semibold ${
          isPositive
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
        <span>{priceChange.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default CoinCard;
