
import React, { useState } from 'react';
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
            <a href="/" className="text-xl font-bold text-blue-600">
              Eventtia
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <span>Products</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Virtual Events</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">In-Person Events</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Hybrid Events</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <span>Solutions</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Corporate Events</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Conferences</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Trade Shows</a>
              </div>
            </div>
            
            <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Resources</a>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Login</a>
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
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Products</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Solutions</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Resources</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Login</a>
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
