
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileSidebarToggleProps {
  toggleMobileSidebar: () => void;
}

const MobileSidebarToggle: React.FC<MobileSidebarToggleProps> = ({ toggleMobileSidebar }) => {
  return (
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
  );
};

export default MobileSidebarToggle;
