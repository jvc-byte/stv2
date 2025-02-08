import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useState, useEffect, useRef } from 'react';

const ShippingMethodDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const shippings = [
    'Cargo Shipping',
    'Air Shipping',
    'Standard Shipping',
    'Sea Shipping',
    'Road Shipping',
    'International Shipping',
    'Local Shipping',
    'Express Shipping',
    'Same Day Shipping',
    'No Shipping',
  ];

  const filteredShippings = shippings.filter(opt =>
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
        id='shippingMethod'
        name='shippingMethod'
        type="text"
        className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
        placeholder="Select Shipping Method..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      <ChevronDownIcon
        className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none"
        aria-hidden="true"
      />

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredShippings.map((option, index) => (
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

export default ShippingMethodDropdown;