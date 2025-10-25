import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import logo from '../assets/yobo-production-high-resolution-logo-removebg-preview.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Smooth scroll function for homepage sections
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      // If we're already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If we're on another page, navigate to homepage first, then scroll
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  // Professional navigation link classes with bottom line
  const navLinkBaseClasses = "relative px-6 py-4 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/50";
  
  // Professional inactive link with bottom line hover effect
  const navLinkInactiveClasses = "text-gray-400 hover:text-white after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 after:ease-out hover:after:w-4/5 hover:after:left-1/10";
  
  // Professional active link with bottom line
  const navLinkActiveClasses = "text-white after:absolute after:bottom-0 after:left-1/2 after:w-4/5 after:h-0.5 after:bg-gradient-to-r from-blue-400 to-purple-500 after:transition-all after:duration-300";

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'UA';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const email = user.email || '';
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <nav className="bg-gray-950/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-700/50 shadow-2xl shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> 
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <img 
              src={logo} 
              alt="YOBO PRODUCTION" 
              className="h-40 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home Link */}
            <Link 
              to="/" 
              className={`${navLinkBaseClasses} ${isActiveLink('/') ? navLinkActiveClasses : navLinkInactiveClasses}`}
            >
              Home
            </Link>
            
            {/* Homepage Section Links with Smooth Scroll */}
            <button
              onClick={() => scrollToSection('services')}
              className={`${navLinkBaseClasses} ${navLinkInactiveClasses} cursor-pointer`}
            >
              Services
            </button>
            
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`${navLinkBaseClasses} ${navLinkInactiveClasses} cursor-pointer`}
            >
              Portfolio
            </button>
            
            <button
              onClick={() => scrollToSection('gallery')}
              className={`${navLinkBaseClasses} ${navLinkInactiveClasses} cursor-pointer`}
            >
              Gallery
            </button>
            
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`${navLinkBaseClasses} ${navLinkInactiveClasses} cursor-pointer`}
            >
              Testimonials
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`${navLinkBaseClasses} ${navLinkInactiveClasses} cursor-pointer`}
            >
              Contact
            </button>

            {user ? (
              <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-600/50">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-purple-500/50 hover:ring-4 hover:ring-blue-400/50 transition-all duration-300 ease-in-out cursor-pointer shadow-lg shadow-purple-500/20">
                    {getUserInitials()}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-100">
                      {getUserDisplayName()}
                    </div>
                    <div className="text-xs text-blue-400 font-medium">
                      {user.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-600/50 hover:bg-red-900/50 hover:border-red-500/50 hover:text-red-200 transition-all duration-300 transform hover:scale-[1.02] shadow-none hover:shadow-lg hover:shadow-red-500/10"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-600/50">
                {/* Professional Sign In button */}
                <Link
                  to="/signin"
                  className="px-6 py-3 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-600/50 hover:bg-blue-900/50 hover:border-blue-500/50 hover:text-blue-200 transition-all duration-300 transform hover:scale-[1.02] shadow-none hover:shadow-lg hover:shadow-blue-500/10"
                >
                  Sign In
                </Link>
                {/* Professional Get Started button */}
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-400/30 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-3 rounded-xl text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 ease-in-out transform hover:scale-105 ${isMenuOpen ? 'rotate-90 bg-gray-700 text-white' : ''} border border-gray-600/50`}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-out transform ${isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'} overflow-hidden`}>
        <div className="bg-gray-900/95 backdrop-blur-2xl rounded-b-2xl shadow-2xl border-t border-gray-600/50 mt-0 mx-2 mb-2 p-6 space-y-3">
          
          {/* Mobile Navigation Links with Bottom Lines */}
          <Link 
            to="/" 
            className={`block w-full text-center px-4 py-4 text-base font-medium transition-all duration-200 relative ${isActiveLink('/') ? 'text-white after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r from-blue-400 to-purple-500' : 'text-gray-400 hover:text-white after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-400 hover:text-white transition-all duration-200 relative after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16"
          >
            Services
          </button>
          
          <button
            onClick={() => scrollToSection('portfolio')}
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-400 hover:text-white transition-all duration-200 relative after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16"
          >
            Portfolio
          </button>
          
          <button
            onClick={() => scrollToSection('gallery')}
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-400 hover:text-white transition-all duration-200 relative after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16"
          >
            Gallery
          </button>
          
          <button
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-400 hover:text-white transition-all duration-200 relative after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16"
          >
            Testimonials
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-400 hover:text-white transition-all duration-200 relative after:absolute after:bottom-2 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-16"
          >
            Contact
          </button>

          {/* User Section */}
          {user ? (
            <div className="pt-6 border-t border-gray-600/50 space-y-4">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-600/50">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-gray-100 truncate">{getUserDisplayName()}</div>
                  <div className="text-sm text-blue-400 truncate">{user.email || 'user@example.com'}</div>
                </div>
              </div>
              <button 
                onClick={handleSignOut} 
                className="w-full px-4 py-3 rounded-lg text-base font-medium text-red-300 bg-red-900/30 border border-red-600/50 hover:bg-red-900/50 hover:text-red-200 transition-all duration-200 text-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-6 border-t border-gray-600/50 space-y-4">
              <Link 
                to="/signin" 
                className="block w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700/50 hover:text-white transition-all duration-200 text-center" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block w-full px-4 py-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-400/30 shadow-lg shadow-purple-500/30 transition-all duration-200 text-center transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;