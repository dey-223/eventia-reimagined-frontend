
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  currentUser: any;
  onLogout: () => void;
  setIsOpen: (value: boolean) => void;
}

const MobileMenu = ({ currentUser, onLogout, setIsOpen }: MobileMenuProps) => {
  return (
    <div className="md:hidden mt-4 pb-4">
      <Link to="#" className="block py-2 text-gray-600 hover:text-blue-600">Products</Link>
      <Link to="#" className="block py-2 text-gray-600 hover:text-blue-600">Solutions</Link>
      <Link to="/event-program" className="flex items-center py-2 text-gray-600 hover:text-blue-600">
        <Calendar size={16} className="mr-1" />
        <span>Program</span>
      </Link>
      <Link to="/pricing" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
      <Link to="/resources" className="block py-2 text-gray-600 hover:text-blue-600">Resources</Link>
      <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600">About</Link>
      <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600">Contact</Link>
      
      <Link to="/events" className="block py-2 text-gray-600 hover:text-blue-600">
        Événements
      </Link>
      
      {currentUser ? (
        <div className="border-t border-gray-200 mt-2 pt-2">
          <div className="flex items-center space-x-2 py-2">
            <User size={20} className="text-gray-600" />
            <span className="font-medium">{currentUser.name}</span>
          </div>
          <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">Dashboard</Link>
          <Link to="/dashboard/events" className="block py-2 text-gray-600 hover:text-blue-600">My Events</Link>
          <button 
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left py-2 text-red-600 hover:text-red-700"
          >
            Log out
          </button>
        </div>
      ) : (
        <>
          <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-600">Login</Link>
          <Link to="/register">
            <Button className="w-full mt-4 gradient-primary">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
