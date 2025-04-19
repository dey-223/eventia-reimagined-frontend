
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const ProductsMenu = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
        <span>Products</span>
        <ChevronDown size={16} />
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Virtual Events</Link>
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">In-Person Events</Link>
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Hybrid Events</Link>
      </div>
    </div>
  );
};

export default ProductsMenu;
