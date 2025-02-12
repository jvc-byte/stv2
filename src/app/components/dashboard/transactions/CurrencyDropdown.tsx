import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useState, useEffect, useRef } from 'react';

interface CurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CurrencyDropdown = ({ value, onChange }: CurrencyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currency = [
    { name: 'STNGN' },
    { name: 'USDT' },
    { name: 'USDC' },
    { name: 'ETH' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span className="text-gray-500">{value || 'Select Currency...'}</span>
        <ChevronDownIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div
          role="listbox"
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto"
        >
          {currency.map((option, index) => (
            <div
              key={index}
              role="option"
              aria-selected={value === option.name}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.name); // Pass the selected role name to the parent
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(option.name);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;