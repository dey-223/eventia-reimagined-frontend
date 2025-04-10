
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SidebarItem from './SidebarItem';
import { SidebarNavItem } from '@/types/dashboard';

interface DesktopSidebarProps {
  navItems: SidebarNavItem[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isActive: (path: string, exact: boolean) => boolean;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  navItems,
  isSidebarOpen,
  toggleSidebar,
  isActive
}) => {
  return (
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
              isActive={isActive}
              isSidebarOpen={isSidebarOpen}
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
  );
};

export default DesktopSidebar;
