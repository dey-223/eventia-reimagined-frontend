
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const SolutionsMenu = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
        <span>Solutions</span>
        <ChevronDown size={16} />
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Corporate Events</Link>
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Conferences</Link>
        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Trade Shows</Link>
      </div>
    </div>
  );
};

export default SolutionsMenu;
