
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Plus, 
  Settings, 
  Menu, 
  X, 
  ChevronRight,
  Users,
  BarChart
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        {/* Desktop Sidebar */}
        <aside 
          className={cn(
            "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden md:block",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className={cn("font-semibold text-gray-800", !isSidebarOpen && "hidden")}>
                Dashboard
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
            <nav className="p-4 space-y-1 flex-grow">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md mb-1 group",
                      isActive(item.path, item.exact) && "bg-blue-50 text-blue-600"
                    )}
                  >
                    <item.icon 
                      className={cn(
                        "h-5 w-5",
                        isActive(item.path, item.exact) ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                      )} 
                    />
                    {isSidebarOpen && <span className="ml-3">{item.title}</span>}
                  </Link>
                  
                  {isSidebarOpen && item.children && (
                    <div className="pl-10 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
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

        {/* Mobile sidebar toggle */}
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

        {/* Mobile sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
            <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Dashboard</h2>
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
                  <div key={item.path}>
                    <Link 
                      to={item.path} 
                      onClick={toggleMobileSidebar}
                      className={cn(
                        "flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md mb-1",
                        isActive(item.path, item.exact) && "bg-blue-50 text-blue-600"
                      )}
                    >
                      <item.icon 
                        className={cn(
                          "h-5 w-5 mr-3",
                          isActive(item.path, item.exact) ? "text-blue-600" : "text-gray-500"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                    
                    {item.children && (
                      <div className="pl-10 space-y-1 mt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={toggleMobileSidebar}
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
          "flex-1 bg-gray-50 overflow-auto transition-all duration-300 ease-in-out",
          isMobileSidebarOpen ? "blur-sm md:blur-none" : ""
        )}>
          <div className="container mx-auto p-6 pb-24 md:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
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
