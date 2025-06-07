import React, { useState } from 'react';

const Navbar = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (targetPage) => {
    setPage(targetPage);
    setMenuOpen(false); // tutup menu saat klik nav item di mobile
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src="/logo.png"
              alt="Sungokong Crypto Logo"
              className="w-44 h-auto"
              loading="lazy"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 font-semibold text-lg select-none">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className={`relative px-2 py-1 hover:text-yellow-400 transition-colors duration-300 ${
                  page === 'home' ? 'text-yellow-400' : 'text-white'
                }`}
              >
                Beranda
                {page === 'home' && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 rounded transition-all"></span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('news')}
                className={`relative px-2 py-1 hover:text-yellow-400 transition-colors duration-300 ${
                  page === 'news' ? 'text-yellow-400' : 'text-white'
                }`}
              >
                Berita
                {page === 'news' && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 rounded transition-all"></span>
                )}
              </button>
            </li>
          </ul>

          {/* Right side icons desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Placeholder icons for DarkModeToggle and LanguageSwitcher */}
            <button
              aria-label="Toggle Dark Mode"
              className="p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              🌙
            </button>
            <button
              aria-label="Change Language"
              className="p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              🌐
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-900 bg-opacity-90 backdrop-blur-sm shadow-lg">
          <ul className="flex flex-col space-y-3 p-4 font-semibold text-lg select-none">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-2 py-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition ${
                  page === 'home' ? 'bg-yellow-400 text-gray-900' : 'text-white'
                }`}
              >
                Beranda
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('news')}
                className={`w-full text-left px-2 py-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition ${
                  page === 'news' ? 'bg-yellow-400 text-gray-900' : 'text-white'
                }`}
              >
                Berita
              </button>
            </li>
            {/* Tambah tombol dark mode dan language di mobile */}
            <li className="flex space-x-4 px-2 py-2">
              <button
                aria-label="Toggle Dark Mode"
                className="flex-1 p-2 rounded bg-yellow-400 text-gray-900 font-bold text-center hover:bg-yellow-500 transition"
              >
                🌙 Dark Mode
              </button>
              <button
                aria-label="Change Language"
                className="flex-1 p-2 rounded bg-yellow-400 text-gray-900 font-bold text-center hover:bg-yellow-500 transition"
              >
                🌐 Language
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
