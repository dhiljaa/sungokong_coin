import React, { useState, useEffect, useCallback } from 'react';
import CoinCard from './CoinCard';
import AlertPriceModal from './AlertPriceModal';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        if (!res.ok) throw new Error('Failed to fetch coins');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch coin data.');
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const fetchPriceHistory = async (coinId) => {
    setLoadingHistory(true);
    setErrorHistory(null);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error('Failed to fetch price history');
      const data = await res.json();
      const formatted = data.prices.map(([timestamp, price]) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return {
          date: `${year}-${month}-${day}`,
          price: Number(price.toFixed(2)),
        };
      });
      setPriceHistory(formatted);
    } catch (err) {
      console.error(err);
      setErrorHistory('Failed to load price history.');
      setPriceHistory([]);
    } finally {
      setLoadingHistory(false);
      setModalOpen(true);
    }
  };

  const handleCoinClick = useCallback(
    (coin) => {
      if (loadingHistory) return; // cegah klik saat masih loading
      setSelectedCoin(coin);
      setPriceHistory([]);
      fetchPriceHistory(coin.id);
    },
    [loadingHistory]
  );

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCoin(null);
    setPriceHistory([]);
    setErrorHistory(null);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading && <p className="col-span-full text-center">Loading coins...</p>}
      {error && <p className="col-span-full text-center text-red-500">{error}</p>}
      {!loading && !error && coins.length === 0 && (
        <p className="col-span-full text-center">No coins available.</p>
      )}

      {!loading &&
        !error &&
        coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => handleCoinClick(coin)}
            className="cursor-pointer"
          >
            <CoinCard coin={coin} />
          </div>
        ))}

      <AlertPriceModal
        isOpen={modalOpen}
        onClose={closeModal}
        coin={selectedCoin}
        priceHistory={priceHistory}
        loading={loadingHistory}
        error={errorHistory}
      />
    </div>
  );
};

export default CoinList;
