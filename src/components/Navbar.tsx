import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar } from 'lucide-react';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';
import ProductsMenu from './navbar/ProductsMenu';
import SolutionsMenu from './navbar/SolutionsMenu';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
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
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, [location.pathname]);
  
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
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } finally {
      setIsOpen(false);
    }
  };
  
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return (
    <nav className="w-full py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Eventtia
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <ProductsMenu />
            <SolutionsMenu />
            
            <Link to="/events" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Calendar size={16} className="inline" />
              <span>Événements</span>
            </Link>
            
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            
            <Link to="/events" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Calendar size={16} className="inline" />
              <span>Événements</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <UserMenu currentUser={currentUser} onLogout={handleLogout} />
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
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <MobileMenu 
            currentUser={currentUser}
            onLogout={handleLogout}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
