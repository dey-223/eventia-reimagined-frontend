
import React from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  currentUser: any;
  onLogout: () => void;
}

const UserMenu = ({ currentUser, onLogout }: UserMenuProps) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <User size={20} />
        <span>{currentUser.name}</span>
        <ChevronDown size={16} />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Dashboard</Link>
        <Link to="/dashboard/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">My Events</Link>
        <button 
          onClick={onLogout}
          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
