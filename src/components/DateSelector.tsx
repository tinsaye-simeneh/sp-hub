import React from 'react';
import { calendar, chevronLeft, chevronRight } from '../assets';

interface DateSelectorProps {
  onDateChange?: (date: string | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange: _onDateChange }) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-center mb-6">
        <div className="w-full max-w-[820px] h-[56px] flex items-center justify-between rounded-lg pt-2 pr-4 pb-2 pl-4 bg-[#1D1E2B] relative">
          <button title="Previous Day" className="p-2 rounded-full transition-colors cursor-pointer">
            <img src={chevronLeft} alt="chevron left" className="w-[20px] h-[20px]" />
          </button>
          <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            <img src={calendar} alt="calendar" className="w-[24px] h-[24px]" />
            <span className="text-text-primary text-[14px] font-medium">Today</span>
          </div>
          <button title="Next Day" className="p-2 rounded-full transition-colors cursor-pointer">
            <img src={chevronRight} alt="chevron right" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      <div className="md:hidden mb-6 w-full overflow-x-hidden">
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 overflow-x-auto scrollbar-hide max-w-full">
            <div className="flex items-center gap-8 pr-4">
              <div className="flex flex-col items-center leading-tight opacity-30">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">WED</span>
                <span className="text-text-secondary text-[14px] font-medium">AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">WED</span>
                <span className="text-text-secondary text-[14px] font-medium">30 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-primary text-[14px] font-medium tracking-wide">THU</span>
                <span className="text-text-primary text-[14px] font-medium">31 JUL</span>
              </div>

              <div className="bg-bg-dateToday rounded-lg px-5 py-2 flex flex-col items-center leading-tight">
                <span className="text-brand-secondary text-[16px] font-medium">Today</span>
                <span className="text-brand-secondary text-[16px] font-medium">1 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">SAT</span>
                <span className="text-text-secondary text-[14px] font-medium">2 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight opacity-40">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">SUN</span>
                <span className="text-text-secondary text-[14px] font-medium">3 AUG</span>
              </div>
            </div>
          </div>

          <button
            title="Open Calendar"
            aria-label="Open Calendar"
            className="w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center flex-shrink-0 cursor-pointer"
          >
            <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M6 11h12M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default DateSelector;

