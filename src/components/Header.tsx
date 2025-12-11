import React, { useState } from 'react';
import { logo, globe, ball, pl, eg } from '../assets';

const Header: React.FC = () => {
  const navItems = ['Live', 'Matches', 'Standings', 'Teams', 'Comparison', 'Statistics', 'Venues'];
  const activeTab = 'Matches';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-primary border-b border-border-primary w-screen top-0 sticky z-50">
      <div className="max-w-[1440px] mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="logo" className="w-[120px] md:w-[200px] h-auto md:h-[60px]" />
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`px-2 py-2 text-[18px] transition-all relative border-b-2 ${
                  item === activeTab
                    ? 'text-brand-secondary border-brand-secondary'
                    : item === 'Standings'
                    ? 'text-text-secondary border-transparent hover:text-text-primary hover:border-brand-secondary'
                    : 'text-text-primary border-transparent hover:text-text-primary hover:border-brand-secondary'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-black/40 transition-colors flex items-center justify-center">
             <img src={globe} alt="globe" className="w-[24px] h-[24px]" />
            </button>
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-black/40 transition-colors flex items-center justify-center">
              <img src={ball} alt="ball" className="w-[24px] h-[24px]" />
            </button>

            <div className="w-auto md:w-[206px] h-[40px] py-2 px-2 md:px-4 rounded-full bg-[#00000026] flex items-center gap-1 overflow-hidden hover:bg-black/40 transition-colors">
              <img src={pl} alt="premier league" className="w-[16px] h-[16px] flex-shrink-0" />
              <select 
                title="premier league" 
                className="bg-overlay text-text-primary text-base border-none outline-none cursor-default pr-3 hidden md:block"
                onMouseDown={(e) => e.preventDefault()}
              >
                <option>Premier League</option>
              </select>
            </div>

            <div className="w-[123px] h-[40px] py-2 px-4 rounded-full bg-[#00000026] flex items-center justify-center hover:bg-black/40 transition-colors">
              <select 
                title="2024/25" 
                className="bg-transparent font-medium text-text-primary text-base border-none outline-none cursor-default pr-3"
                onMouseDown={(e) => e.preventDefault()}
              >
                <option>2024/25</option>
              </select>
            </div>

            <button className="hidden md:flex w-[40px] h-[40px] px-1 rounded-full bg-[#00000026] hover:bg-black/40 transition-colors items-center justify-center">
              <img src={eg} alt="flag" className="w-[24px] h-[24px]" />
            </button>
            
            <div className="relative md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-[40px] h-[40px] px-1 transition-colors flex items-center justify-center ml-2"
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Dropdown Menu - Mobile Only */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-bg-secondary rounded-lg shadow-lg border border-border-primary py-2 z-50">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        item === activeTab
                          ? 'text-brand-primary bg-bg-secondary'
                          : item === 'Standings'
                          ? 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
                          : 'text-text-primary hover:bg-bg-hover'
                      }`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

