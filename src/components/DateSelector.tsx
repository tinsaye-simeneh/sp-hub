import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { calendar, chevronLeft, chevronRight } from '../assets';

interface DateSelectorProps {
  onDateChange?: (date: string | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange: _onDateChange }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, right: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        buttonRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPickerPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <>
      <div className="hidden lg:flex items-center justify-center mb-6">
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
                <span className="text-text-secondary text-[14px] font-medium whitespace-nowrap">AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">WED</span>
                <span className="text-text-secondary text-[14px] font-medium whitespace-nowrap">30 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-primary text-[14px] font-medium tracking-wide">THU</span>
                <span className="text-text-primary text-[14px] font-medium whitespace-nowrap">31 JUL</span>
              </div>

              <div className="bg-bg-dateToday rounded-lg px-5 py-2 flex flex-col items-center leading-tight">
                <span className="text-brand-secondary text-[16px] font-medium">Today</span>
                <span className="text-brand-secondary text-[16px] font-medium whitespace-nowrap">1 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">SAT</span>
                <span className="text-text-secondary text-[14px] font-medium whitespace-nowrap">2 AUG</span>
              </div>

              <div className="flex flex-col items-center leading-tight opacity-40">
                <span className="text-text-secondary text-[14px] font-medium tracking-wide">SUN</span>
                <span className="text-text-secondary text-[14px] font-medium whitespace-nowrap">3 AUG</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              ref={buttonRef}
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              title="Open Calendar"
              aria-label="Open Calendar"
              className="w-11 h-11 rounded-full bg-bg-secondary flex items-center justify-center flex-shrink-0 cursor-pointer relative z-10"
            >
              <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M6 11h12M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
              </svg>
            </button>

            {isPickerOpen && createPortal(
              <div
                ref={pickerRef}
                className="fixed bg-[#1D1E2B] border border-white rounded-lg shadow-lg p-4 z-[115] min-w-[280px]"
                style={{
                  top: `${pickerPosition.top}px`,
                  right: `${pickerPosition.right}px`,
                }}
              >
                <div className="mb-4">
                  <h3 className="text-text-primary text-lg font-semibold text-center">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-text-secondary text-xs font-medium text-center py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (day !== null) {
                          setIsPickerOpen(false);
                        }
                      }}
                      className={`
                        w-8 h-8 rounded text-sm font-medium transition-colors cursor-pointer
                        ${day === null ? 'invisible' : ''}
                        ${day === currentDate ? 'bg-brand-secondary text-black' : 'text-text-primary hover:bg-bg-hover'}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>,
              document.body
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DateSelector;

