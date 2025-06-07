import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
        <p className="font-semibold mb-1">{formatDate(label)}</p>
        <p>Price: ${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ChartPriceTrend = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No price history available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300} aria-label="Price trend chart">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: '#4a5568', fontWeight: '600' }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          tick={{ fill: '#4a5568', fontWeight: '600' }}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#6b46c1"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: '#6b46c1' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartPriceTrend;
