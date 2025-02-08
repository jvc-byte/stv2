import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useState, useEffect, useRef } from 'react';

const StyledDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options = [
    'Domain',
    'Contracted Service',
    'Milestone Transaction',
    'Jewelry',
    'Antiques',
    'Electronics'
  ];

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(value.toLowerCase())
  );

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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        id='item'
        name='item'
        type="text"
        className="w-full border border-gray-300 border-l-0 rounded-r-md px-4 py-2 pr-10 focus:outline-none"
        placeholder="Search or select..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      <ChevronDownIcon
        className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-900 pointer-events-none"
        aria-hidden="true"
      />

      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyledDropdown;