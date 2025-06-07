import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CoinCard from './components/CoinCard';
import DarkModeToggle from './components/DarkModeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import AlertPriceModal from './components/AlertPriceModal';
import SortSelector from './components/SortSelector';

import logo from './assets/logo.png';

const NEWS_API_KEY = '298bebfe672e4e7ebd4d1b96e2a2777b';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // News state
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');

  // Timeframe state for price history
  const [timeframe, setTimeframe] = useState('7'); // default 7 days

  // Navbar page state: 'home' or 'news'
  const [page, setPage] = useState('home');

  // Fetch coins data on mount
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching coin data:', err);
        setError('Failed to fetch coin data.');
        setLoading(false);
      });
  }, []);

  // Fetch news once on mount
  useEffect(() => {
  setNewsLoading(true);
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  fetch(
    `https://newsapi.org/v2/everything?q=cryptocurrency OR bitcoin OR ethereum&language=en&sortBy=publishedAt&pageSize=10&from=${fromDate}&apiKey=${NEWS_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch news');
      return res.json();
    })
    .then((data) => {
      setNews(data.articles || []);
      setNewsLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching news:', err);
      setNewsError('Failed to fetch news.');
      setNewsLoading(false);
    });
}, []);

  // Filtering coins based on search
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting coins based on selected option
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'market_cap_asc':
        return a.market_cap - b.market_cap;
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      default:
        return 0;
    }
  });

  // Fetch price history with dynamic timeframe
  const fetchPriceHistory = (coinId, days = '7') => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.prices.map(([timestamp, price]) => {
          const date = new Date(timestamp);
          let formattedDate = '';
          if (days === '1') {
            formattedDate = `${date.getHours()}:00`;
          } else if (days === '365') {
            formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
              .getFullYear()
              .toString()
              .slice(-2)}`;
          } else {
            formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
          }
          return {
            date: formattedDate,
            price: Number(price.toFixed(2)),
          };
        });
        setPriceHistory(formatted);
      })
      .catch((err) =>
        console.error(`Failed to fetch price history for ${coinId}:`, err)
      );
  };

  // Handle click on a coin card to open modal
  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    fetchPriceHistory(coin.id, timeframe);
    setModalOpen(true);
  };

  // Close modal and reset related state
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCoin(null);
    setPriceHistory([]);
    setTimeframe('7');
  };

  // Update price history if timeframe changes and modal is open
  useEffect(() => {
    if (selectedCoin && modalOpen) {
      fetchPriceHistory(selectedCoin.id, timeframe);
    }
  }, [timeframe, selectedCoin, modalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white p-6 transition-colors duration-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-6 border-b border-white border-opacity-20 pb-3">
        <img src={logo} alt="Sungokong Crypto Logo" className="w-40 h-auto" />
        <ul className="flex space-x-8 text-lg font-semibold">
          <li>
            <button
              className={`hover:text-yellow-300 ${
                page === 'home' ? 'text-yellow-300 underline' : ''
              }`}
              onClick={() => setPage('home')}
            >
              Beranda
            </button>
          </li>
          <li>
            <button
              className={`hover:text-yellow-300 ${
                page === 'news' ? 'text-yellow-300 underline' : ''
              }`}
              onClick={() => setPage('news')}
            >
              Berita
            </button>
          </li>
        </ul>
        <div className="flex space-x-4">
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Content */}
      {page === 'home' ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <SearchBar search={search} setSearch={setSearch} />
            <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
          </div>

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center col-span-full text-lg font-semibold animate-pulse">
                Loading coins...
              </p>
            ) : error ? (
              <p className="text-center col-span-full text-red-500 font-semibold">
                {error}
              </p>
            ) : sortedCoins.length > 0 ? (
              sortedCoins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                  className="cursor-pointer"
                  role="button"
                  aria-label={`View details for ${coin.name}`}
                >
                  <CoinCard
                    coin={coin}
                    className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full mt-12 text-lg font-semibold">
                No coins found for "
                <span className="text-yellow-300">{search}</span>". Try checking your
                spelling.
              </p>
            )}
          </main>
        </>
      ) : (

        
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h2 className="text-3xl font-extrabold mb-8 text-yellow-400">Berita Terbaru Cryptocurrency</h2>

  {newsLoading ? (
    <p className="text-center text-gray-400">Loading berita...</p>
  ) : newsError ? (
    <p className="text-center text-red-500 font-semibold">{newsError}</p>
  ) : news.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((article, idx) => (
        <div
          key={idx}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          aria-label={`Berita: ${article.title}`}
        >
          {/* Gambar */}
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-52 object-cover rounded-t-xl"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-52 bg-gray-700 flex items-center justify-center text-gray-400 rounded-t-xl font-medium">
              No Image
            </div>
          )}

          {/* Konten */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-3 text-yellow-300 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-gray-200 mb-5 line-clamp-4">{article.description || "Deskripsi berita tidak tersedia."}</p>

            <div className="mt-auto flex flex-col gap-1 mb-5">
              <time
                dateTime={article.publishedAt}
                className="text-xs text-gray-400"
              >
                {new Date(article.publishedAt).toLocaleString()}
              </time>
              <span className="text-xs text-gray-400 italic">Source: {article.source.name}</span>
            </div>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg shadow-md transition-colors duration-200"
              aria-label={`Lihat selengkapnya berita: ${article.title}`}
            >
              Lihat Selengkapnya
            </a>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-400 font-medium">Tidak ada berita terbaru saat ini.</p>
  )}
</section>


      )}

      <AlertPriceModal
        isOpen={modalOpen}
        onClose={closeModal}
        coin={selectedCoin}
        priceHistory={priceHistory}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />
    </div>
  );
};

export default App;
