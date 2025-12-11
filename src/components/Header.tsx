import React from 'react';
import logo from '../../public/logo.png';
import globe from '../../public/globe.png';
import ball from '../../public/ball.png';
import pl from '../../public/pl.png';
import eg from '../../public/eg.png';

const Header: React.FC = () => {
  const navItems = ['Live', 'Matches', 'Standings', 'Teams', 'Comparison', 'Statistics', 'Venues'];
  const activeTab = 'Matches';

  return (
    <header className="bg-[#6D00FF] border-b border-[#2A2A2A] w-screen">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="logo" className="w-40 h-15" />
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`px-2 py-2 text-[18px] font-medium transition-all relative border-b-2 ${
                  item === activeTab
                    ? 'text-[#FFFFFF] border-[#6D00FF]'
                    : 'text-[#B3B3B3] border-transparent hover:text-[#FFFFFF] hover:border-[#6D00FF]'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Icons */}
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
             <img src={globe} alt="globe" className="w-[25px] h-[25px]" />
            </button>
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
              <img src={ball} alt="ball" className="w-[25px] h-[25px]" />
            </button>

            <div className="h-[40px] py-2 px-1 rounded-full bg-[#00000026] flex items-center gap-2">
              <img src={pl} alt="premier league" className="w-[25px] h-[25px]" />
              <select title="premier league" className="bg-transparent text-[#FFFFFF] text-sm border-none outline-none cursor-pointer">
                <option>Premier League</option>
              </select>
            </div>

            <div className="h-[40px] py-2 px-1 rounded-full bg-[#00000026] flex items-center justify-center">
              <select title="2024/25" className="bg-transparent text-[#FFFFFF] text-sm border-none outline-none cursor-pointer">
                <option>2024/25</option>
              </select>
            </div>

            <button className="w-[40px] h-[40px] px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
              <img src={eg} alt="flag" className="w-[25px] h-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

