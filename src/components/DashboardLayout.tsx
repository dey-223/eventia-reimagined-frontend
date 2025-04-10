
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  BarChart,
  Users,
} from 'lucide-react';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import DashboardHeader from './dashboard/DashboardHeader';
import DesktopSidebar from './dashboard/DesktopSidebar';
import MobileSidebar from './dashboard/MobileSidebar';
import MobileNavigation from './dashboard/MobileNavigation';
import MobileSidebarToggle from './dashboard/MobileSidebarToggle';
import { SidebarNavItem } from '@/types/dashboard';
import useDashboardAuth from '@/hooks/useDashboardAuth';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useDashboardAuth();
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader currentUser={currentUser} />
      
      <div className="flex-grow flex pt-[57px]">
        <DesktopSidebar 
          navItems={navItems}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isActive={isActive}
        />

        <MobileSidebarToggle toggleMobileSidebar={toggleMobileSidebar} />

        <MobileSidebar 
          navItems={navItems}
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
          isActive={isActive}
        />

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

      <MobileNavigation />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
