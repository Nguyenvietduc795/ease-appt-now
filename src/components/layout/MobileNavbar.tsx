
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, HelpCircle, Menu } from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Calendar size={24} />, label: 'Appointments', path: '/appointments' },
    { icon: <User size={24} />, label: 'Profile', path: '/profile' },
    { icon: <HelpCircle size={24} />, label: 'Help', path: '/help' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              location.pathname === item.path 
                ? 'text-primary-500 bg-primary-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
