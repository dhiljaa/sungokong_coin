import React, { useEffect, useRef } from 'react';
import ChartPriceTrend from './ChartPriceTrend';

const AlertPriceModal = ({
  isOpen,
  onClose,
  coin,
  priceHistory,
  timeframe,
  setTimeframe,
}) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !coin) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          ref={closeButtonRef}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h3
          id="modal-title"
          className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3"
        >
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          {coin.name} Price History
        </h3>

        <div className="mb-4">
          <label
            htmlFor="timeframe-select"
            className="block mb-1 font-medium text-gray-700"
          >
            Pilih Timeframe:
          </label>
          <select
  id="timeframe-select"
  value={timeframe}
  onChange={(e) => setTimeframe(e.target.value)}
  className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
>
  <option value="1">1 Hari</option>
  <option value="7">7 Hari</option>
  <option value="30">30 Hari</option>
  <option value="90">90 Hari</option>
  <option value="365">1 Tahun</option>
</select>

        </div>

        <ChartPriceTrend data={priceHistory} />

        {/* Kamu bisa tambahkan fitur lain di sini seperti alert harga, dll */}
      </div>
    </div>
  );
};

export default AlertPriceModal;
