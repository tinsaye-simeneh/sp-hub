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
    <header className="bg-[#6D00FF] border-b border-[#2A2A2A] w-screen top-0 sticky z-50">
      <div className="max-w-[1440px] mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="logo" className="w-[200px] h-[60px]" />
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`px-2 py-2 text-[18px] transition-all relative border-b-2 ${
                  item === activeTab
                    ? 'text-[#00FFA5] border-[#00FFA5]'
                    : item === 'Standings'
                    ? 'text-[#CAC4D0] border-transparent hover:text-[#FFFFFF] hover:border-[#00FFA5]'
                    : 'text-[#FFFFFF] border-transparent hover:text-[#FFFFFF] hover:border-[#00FFA5]'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
             <img src={globe} alt="globe" className="w-[24px] h-[24px]" />
            </button>
            <button className="w-[40px] h-[40px] py-2 px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
              <img src={ball} alt="ball" className="w-[24px] h-[24px]" />
            </button>

            <div className="w-[206px] h-[40px] py-2 px-4 rounded-full bg-[#00000026] flex items-center gap-1 overflow-hidden hover:bg-[rgba(0,0,0,0.8)] transition-colors">
              <img src={pl} alt="premier league" className="w-[16px] h-[16px] flex-shrink-0" />
              <select 
                title="premier league" 
                className="bg-transparent text-[#FFFFFF] text-base border-none outline-none cursor-default pr-3"
                onMouseDown={(e) => e.preventDefault()}
              >
                <option>Premier League</option>
              </select>
            </div>

            <div className="w-[123px] h-[40px] py-2 px-4 rounded-full bg-[#00000026] flex items-center justify-center hover:bg-[rgba(0,0,0,0.8)] transition-colors">
              <select 
                title="2024/25" 
                className="bg-transparent font-medium text-[#FFFFFF] text-base border-none outline-none cursor-default pr-3"
                onMouseDown={(e) => e.preventDefault()}
              >
                <option>2024/25</option>
              </select>
            </div>

            <button className="w-[40px] h-[40px] px-1 rounded-full bg-[#00000026] hover:bg-[#00000040] transition-colors flex items-center justify-center">
              <img src={eg} alt="flag" className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

