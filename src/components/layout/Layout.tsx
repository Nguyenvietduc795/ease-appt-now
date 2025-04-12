
import React from 'react';
import Header from './Header';
import MobileNavbar from './MobileNavbar';

interface LayoutProps {
  children: React.ReactNode;
  noMobileNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noMobileNav = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-8">
        {children}
      </main>
      
      {!noMobileNav && <MobileNavbar />}
    </div>
  );
};

export default Layout;
