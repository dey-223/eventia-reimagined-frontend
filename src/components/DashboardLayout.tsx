
import React, { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  BarChart,
  Users,
  Menu,
  ChevronRight,
  X,
  LogOut,
  User,
  Plus
} from 'lucide-react';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Button } from '@/components/ui/button';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';

interface SidebarNavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  exact: boolean;
  children?: {
    title: string;
    path: string;
    exact: boolean;
  }[];
}

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Auth handling
  React.useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const userStr = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Redirect to login if no token found
        navigate('/login');
        return;
      }
      
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setCurrentUser(null);
          navigate('/login');
        }
      } else {
        setCurrentUser(null);
        navigate('/login');
      }
    };
    
    checkUser();
    
    // Listen for storage changes
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the API call fails, clear local data
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };
  
  const navItems: SidebarNavItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      exact: true
    },
    {
      title: 'Events',
      icon: Calendar,
      path: '/dashboard/events',
      exact: false,
      children: [
        {
          title: 'All Events',
          path: '/dashboard/events',
          exact: true
        },
        {
          title: 'Create Event',
          path: '/dashboard/events/create',
          exact: true
        }
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart,
      path: '/dashboard/analytics',
      exact: false
    },
    {
      title: 'Attendees',
      icon: Users,
      path: '/dashboard/attendees',
      exact: false
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
      exact: true
    }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Component for Sidebar Item
  const SidebarItem = ({ 
    title, 
    path, 
    icon: Icon, 
    exact, 
    children, 
    onClick 
  }: {
    title: string;
    path: string;
    icon: React.ElementType;
    exact: boolean;
    children?: {
      title: string;
      path: string;
      exact: boolean;
    }[];
    onClick?: () => void;
  }) => {
    return (
      <div>
        <Link 
          to={path} 
          onClick={onClick}
          className={cn(
            "flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md mb-1 group",
            isActive(path, exact) && "bg-blue-50 text-blue-600"
          )}
        >
          <Icon 
            className={cn(
              "h-5 w-5",
              isActive(path, exact) ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
            )} 
          />
          {isSidebarOpen && <span className="ml-3">{title}</span>}
        </Link>
        
        {isSidebarOpen && children && (
          <div className="pl-10 space-y-1 mt-1">
            {children.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                onClick={onClick}
                className={cn(
                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
                  isActive(child.path, child.exact) && "bg-blue-50 text-blue-600"
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-30">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 mr-8">
              Eventtia
            </Link>
            <h1 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h1>
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <User size={18} />
                  <span className="hidden md:inline">{currentUser.name}</span>
                  <ChevronRight size={16} className="transform group-hover:rotate-90 transition-transform" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                  </div>
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">
                    Account Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex-grow flex pt-[57px]">
        {/* Desktop Sidebar */}
        <aside 
          className={cn(
            "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden md:block fixed top-[57px] bottom-0 left-0 z-20",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className={cn("font-semibold text-gray-800", !isSidebarOpen && "hidden")}>
                Navigation
              </h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar} 
                className="text-gray-500 hover:text-gray-700"
              >
                {isSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            <nav className="p-4 space-y-1 flex-grow overflow-y-auto">
              {navItems.map((item) => (
                <SidebarItem 
                  key={item.path}
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                  exact={item.exact}
                  children={item.children}
                />
              ))}
            </nav>
            {isSidebarOpen && (
              <div className="p-4 border-t border-gray-200">
                <Link to="/dashboard/events/create">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Event
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-16 left-0 p-4 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMobileSidebar}
            className="shadow-md"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
            <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg pt-[57px]">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Navigation</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <SidebarItem 
                    key={item.path}
                    title={item.title}
                    path={item.path}
                    icon={item.icon}
                    exact={item.exact}
                    children={item.children}
                    onClick={toggleMobileSidebar}
                  />
                ))}
              </nav>
              <div className="p-4 border-t border-gray-200">
                <Link to="/dashboard/events/create" onClick={toggleMobileSidebar}>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className={cn(
          "flex-1 bg-gray-50 overflow-auto transition-all duration-300 ease-in-out pt-4 ml-0 md:ml-20",
          isMobileSidebarOpen ? "blur-sm md:blur-none" : "",
          isSidebarOpen && "md:ml-64"
        )}>
          <div className="container mx-auto p-6 pb-24 md:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center py-2">
          <Link to="/dashboard" className="flex flex-col items-center text-xs text-gray-600">
            <LayoutDashboard className="h-6 w-6" />
            <span>Overview</span>
          </Link>
          <Link to="/dashboard/events" className="flex flex-col items-center text-xs text-gray-600">
            <Calendar className="h-6 w-6" />
            <span>Events</span>
          </Link>
          <Link to="/dashboard/events/create" className="flex flex-col items-center text-xs text-gray-600">
            <Plus className="h-6 w-6" />
            <span>Create</span>
          </Link>
          <Link to="/dashboard/settings" className="flex flex-col items-center text-xs text-gray-600">
            <Settings className="h-6 w-6" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
