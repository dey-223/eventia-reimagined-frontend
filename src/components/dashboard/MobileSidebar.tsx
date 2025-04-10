
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SidebarItem from './SidebarItem';
import { SidebarNavItem } from '@/types/dashboard';

interface MobileSidebarProps {
  navItems: SidebarNavItem[];
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  isActive: (path: string, exact: boolean) => boolean;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navItems,
  isMobileSidebarOpen,
  toggleMobileSidebar,
  isActive
}) => {
  if (!isMobileSidebarOpen) return null;

  return (
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
              isActive={isActive}
              isSidebarOpen={true}
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
  );
};

export default MobileSidebar;
