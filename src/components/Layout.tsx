
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  BarChart3, 
  Calendar, 
  Clock, 
  Heart, 
  User, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/steps", label: "Steps", icon: Activity },
    { path: "/nutrition", label: "Nutrition", icon: Clock },
    { path: "/progress", label: "Progress", icon: Calendar },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav for mobile */}
      <header className="bg-white shadow-sm md:hidden">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="text-health-primary" />
              <h1 className="font-bold text-xl">HealthTrack</h1>
            </div>
            <button className="p-2">
              <Settings size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Heart className="text-health-primary" size={28} />
              <h1 className="font-bold text-2xl">HealthTrack</h1>
            </div>
          </div>
          <nav className="flex-1 pt-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-health-primary transition-colors",
                        isActive && "text-health-primary bg-blue-50 border-r-4 border-health-primary font-medium"
                      )}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center space-x-2">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Bottom nav for mobile */}
      <nav className="md:hidden bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="flex-1">
                  <Link
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center py-3 text-gray-600 hover:text-health-primary transition-colors",
                      isActive && "text-health-primary"
                    )}
                  >
                    <Icon size={20} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
