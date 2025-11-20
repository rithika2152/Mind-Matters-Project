import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, FileText, Book, Heart, Music, HeartHandshake, User, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Mind Matters</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/assessment" icon={<Activity />} text="Assessment" />
            <NavLink to="/reports" icon={<FileText />} text="Reports" />
            <NavLink to="/resources" icon={<Book />} text="Resources" />
            <NavLink to="/mindfulness" icon={<Heart />} text="Mindfulness" />
            <NavLink to="/activities" icon={<Music />} text="Activities" />
            <NavLink to="/support" icon={<HeartHandshake />} text="24/7 Support" />
            <NavLink to="/profile" icon={<User />} text="Profile" />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 z-50`}
        >
          <div className="flex flex-col space-y-4 px-4 py-6">
            <MobileNavLink to="/assessment" icon={<Activity />} text="Assessment" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/reports" icon={<FileText />} text="Reports" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/resources" icon={<Book />} text="Resources" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/mindfulness" icon={<Heart />} text="Mindfulness" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/activities" icon={<Music />} text="Activities" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/support" icon={<HeartHandshake />} text="24/7 Support" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/profile" icon={<User />} text="Profile" onClick={() => setIsMenuOpen(false)} />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors w-full px-4 py-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, text, onClick }: { to: string; icon: React.ReactNode; text: string; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors w-full px-4 py-2"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;