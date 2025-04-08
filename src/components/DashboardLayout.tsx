
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calendar, Plus, Settings } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Dashboard</h2>
            <nav className="space-y-1">
              <Link 
                to="/dashboard" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Overview
              </Link>
              <Link 
                to="/dashboard/events" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
              >
                <Calendar className="mr-3 h-5 w-5" />
                My Events
              </Link>
              <Link 
                to="/dashboard/events/create" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
              >
                <Plus className="mr-3 h-5 w-5" />
                Create Event
              </Link>
              <Link 
                to="/dashboard/settings" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="flex justify-around items-center py-3">
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

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 md:pb-6 pb-20">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
