
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, Calendar } from 'lucide-react';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in on component mount, route changes, and when localStorage changes
    const checkUser = () => {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    
    checkUser();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, [location.pathname]); // Re-run when the route changes
  
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the API call fails, clear local data
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } finally {
      setIsOpen(false); // Close mobile menu if open
    }
  };
  
  // Check if we're in the dashboard section
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  // Don't render navbar on dashboard pages as it's already handled by DashboardLayout
  if (isDashboard) {
    return null;
  }
  
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
            
            <Link to="/event-program" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Calendar size={16} className="inline" />
              <span>Program</span>
            </Link>
            
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
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
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register">
                  <Button className="gradient-primary">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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
            <Link to="/event-program" className="flex items-center py-2 text-gray-600 hover:text-blue-600">
              <Calendar size={16} className="mr-1" />
              <span>Program</span>
            </Link>
            <Link to="/pricing" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/resources" className="block py-2 text-gray-600 hover:text-blue-600">Resources</Link>
            <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600">Contact</Link>
            
            {currentUser ? (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center space-x-2 py-2">
                  <User size={20} className="text-gray-600" />
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link to="/dashboard/events" className="block py-2 text-gray-600 hover:text-blue-600">My Events</Link>
                <button 
                  onClick={handleLogout}
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
