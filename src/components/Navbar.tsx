
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="w-full py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Eventtia
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="#" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Button className="gradient-primary">
              Request Demo
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link to="#" className="block py-2 text-gray-600 hover:text-blue-600">Products</Link>
            <Link to="#" className="block py-2 text-gray-600 hover:text-blue-600">Solutions</Link>
            <Link to="/pricing" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/resources" className="block py-2 text-gray-600 hover:text-blue-600">Resources</Link>
            <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600">Contact</Link>
            <Link to="#" className="block py-2 text-gray-600 hover:text-blue-600">Login</Link>
            <Button className="w-full mt-4 gradient-primary">
              Request Demo
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
