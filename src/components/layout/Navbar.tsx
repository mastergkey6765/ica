import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, PhoneCall, LogIn, UserCircle, Search, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../lib/AuthContext';
import SearchModal from './SearchModal';

type NavLinkChild = {
  name: string;
  path: string;
  external?: boolean;
};

type NavLink = {
  name: string;
  path: string;
  children?: NavLinkChild[];
};

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { 
    name: 'About ICA',
    path: '/about',
    children: [
      { name: 'Dr. Lord', path: '/dr-lord' },
      { name: 'Leadership', path: '/leadership' },
      { name: 'Advisory Board', path: '/advisory-board' }
    ]
  },
  {
    name: 'The TDI Model',
    path: '/tdi-model'
  },
  {
    name: 'ICA Academy',
    path: '/training',
    children: [
      { name: 'Fundamentals of TDI Certification', path: '/training#fundamentals' },
      { name: 'Advanced Train-the-Trainer Certification', path: '/training#advanced' },
      { name: 'ICA Consultants', path: '/ica-consultants' }
    ]
  },
  {
    name: 'Community',
    path: '/community',
    children: [
      { name: 'Join ICA', path: '/join-ica' },
      { name: 'Events & Workshops', path: '/community#events' },
      { name: 'ICA Informer', path: '/resources#informer' },
      { name: 'Articles & Insights', path: '/resources#articles' },
      { name: 'Dementia Care Guides', path: '/resources#guides' },
      { name: 'Videos & Interviews', path: '/resources#videos' },
      { name: 'Research & Whitepapers', path: '/resources#research' },
      { name: 'FAQ', path: '/resources#faq' }
    ]
  },
  {
    name: 'Contact',
    path: '/contact'
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const { currentUser, isAdmin, isAuthor, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setUserMenuOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full`}>
      {/* Utility Top Bar */}
      <div className="bg-brand-navy text-white transition-all duration-300 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-4 text-sm font-medium">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
          
          <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
          
          {currentUser ? (
             <div className="relative" ref={menuRef}>
               <button 
                 onClick={() => setUserMenuOpen(!userMenuOpen)}
                 className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
               >
                 <UserCircle size={16} />
                 <span>{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                 <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
               </button>
               
               {userMenuOpen && (
                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-gray-800">
                   <div className="px-4 py-3 border-b border-gray-100 mb-1">
                     <p className="text-sm font-medium text-gray-900 truncate">
                       {currentUser.displayName || 'User'}
                     </p>
                     <p className="text-xs text-gray-500 truncate">
                       {currentUser.email}
                     </p>
                   </div>
                   <Link 
                     to="/profile"
                     className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-light-gray hover:text-brand-deep-teal transition-colors"
                     onClick={() => setUserMenuOpen(false)}
                   >
                     <Settings size={18} />
                     Profile Settings
                   </Link>
                   <Link 
                     to="/dashboard"
                     className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-light-gray hover:text-brand-deep-teal transition-colors"
                     onClick={() => setUserMenuOpen(false)}
                   >
                     <UserCircle size={18} />
                     Student Portal
                   </Link>
                   {(isAdmin || isAuthor) && (
                    <Link 
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-brand-light-gray hover:text-brand-deep-teal transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                   )}
                   <button
                     onClick={handleLogout}
                     className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left mt-1"
                   >
                     <LogOut size={18} />
                     Sign Out
                   </button>
                 </div>
               )}
             </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <LogIn size={16} />
              <span>Login Portal</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between lg:justify-center items-center py-2 lg:py-4">
            <div className="flex-shrink-0 flex items-center lg:absolute lg:left-4 xl:left-8 lg:top-1/2 lg:-translate-y-1/2 z-10">
               <Link to="/" className="flex items-center gap-2">
                <img src="/logo-no-background.png" alt="ICA Logo" className="h-[91px] w-[130px] object-contain transition-all duration-300" />
               </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to={link.path}
                    className="flex items-center gap-1 text-[15px] xl:text-base font-semibold text-gray-800 hover:text-brand-deep-teal transition-colors py-2"
                  >
                    {link.name}
                    {link.children && <ChevronDown size={14} className="text-gray-400 group-hover:text-brand-deep-teal transition-colors" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.children && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      {link.children.map((child, idx) => (
                        child.external ? (
                          <a
                            key={idx}
                            href={child.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-light-gray hover:text-brand-deep-teal transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-light-gray hover:text-brand-deep-teal transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center lg:absolute lg:right-4 xl:right-8 top-1/2 lg:-translate-y-1/2">
              <a 
                href="https://meetings.hubspot.com/ethelle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-sm"
              >
                <PhoneCall size={16} />
                Book Consult
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <a 
                href="https://meetings.hubspot.com/ethelle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:hidden items-center text-xs font-bold bg-brand-gold text-brand-navy px-3 py-1.5 rounded-full"
              >
                Book Consult
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-brand-navy"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-gray-100 max-h-[75vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-50 last:border-0">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-gray-900 hover:text-brand-deep-teal"
                      >
                        {link.name}
                        <ChevronDown size={18} className={`transition-transform duration-200 ${mobileDropdown === link.name ? 'rotate-180 text-brand-deep-teal' : 'text-gray-400'}`} />
                      </button>
                      {mobileDropdown === link.name && (
                        <div className="bg-brand-light-gray/50 rounded-lg py-2 mb-2">
                          {link.children.map((child, idx) => (
                            child.external ? (
                              <a
                                key={idx}
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:text-brand-deep-teal"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.name}
                              </a>
                            ) : (
                              <Link
                                key={idx}
                                to={child.path}
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:text-brand-deep-teal"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="block px-3 py-3 text-base font-medium text-gray-900 hover:text-brand-deep-teal"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-6 mt-4 border-t border-gray-100 space-y-4">
                {currentUser ? (
                  <>
                    <div className="px-3">
                      <p className="text-sm font-medium text-brand-navy">{currentUser.displayName || 'Authenticated User'}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                      <UserCircle size={18} /> Student Portal
                    </Link>
                    {(isAdmin || isAuthor) && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-brand-deep-teal font-medium" onClick={() => setIsOpen(false)}>
                        <Settings size={18} /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-600 w-full text-left">
                      <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="flex items-center gap-2 px-3 py-2 font-medium text-brand-deep-teal" onClick={() => setIsOpen(false)}>
                    <LogIn size={20} /> Login / Student Portal
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 font-medium text-gray-700 w-full text-left"
                >
                  <Search size={20} /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
