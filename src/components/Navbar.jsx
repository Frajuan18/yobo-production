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

  // --- FANCY UI CLASSES ---
  // Base classes for navigation links for consistency - DECREASED PADDING AND TEXT SIZE
  const navLinkBaseClasses = "relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-950";
  
  // FANCY: Inactive links get a subtle underline flare on hover
  const navLinkInactiveClasses = "text-gray-300 hover:text-blue-300 before:absolute before:left-0 before:bottom-0 before:h-1 before:w-0 hover:before:w-full before:bg-blue-500 before:rounded-full before:transition-all before:duration-500 before:ease-out";

  // FANCY: Active link has a vibrant gradient, glows, and is slightly larger
  const navLinkActiveClasses = "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-xl shadow-purple-700/50 scale-[1.03] ring-2 ring-blue-300/60";

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
    // FANCY: Deep dark glassmorphism navbar with a strong accent border and shadow - DECREASED HEIGHT
    <nav className="bg-gray-950/90 backdrop-blur-xl sticky top-0 z-50 border-b border-purple-600/30 shadow-2xl shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DECREASED NAVBAR HEIGHT from h-24 to h-20 */}
        <div className="flex justify-between items-center h-20"> 
          {/* Logo/Brand - Using image logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            {/* Logo Image */}
            <img 
              src={logo} 
              alt="YOBO PRODUCTION" 
              className="h-40 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            {/* Logo Text with hover glow - DECREASED SIZE */}
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/" className={`${navLinkBaseClasses} ${isActiveLink('/') ? navLinkActiveClasses : navLinkInactiveClasses}`}>Home</Link>
            <a href="#services" className={`${navLinkBaseClasses} ${navLinkInactiveClasses}`}>Services</a>
            <a href="#portfolio" className={`${navLinkBaseClasses} ${navLinkInactiveClasses}`}>Portfolio</a>
            <a href="#gallery" className={`${navLinkBaseClasses} ${navLinkInactiveClasses}`}>Gallery</a>
            <a href="#testimonials" className={`${navLinkBaseClasses} ${navLinkInactiveClasses}`}>Testimonials</a>

            {user ? (
              <div className="flex items-center space-x-4 ml-5 pl-5 border-l border-purple-500/20">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  {/* FANCY: Avatar has a strong ring/shadow on hover for feedback - DECREASED SIZE */}
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-purple-500/70 hover:ring-4 hover:ring-blue-300 transition-all duration-300 ease-in-out cursor-pointer shadow-lg shadow-purple-500/20">
                    {getUserInitials()}
                  </div>
                  <div className="text-left">
                    {/* DECREASED TEXT SIZE */}
                    <div className="text-sm font-semibold text-gray-100">
                      {getUserDisplayName()}
                    </div>
                    {/* DECREASED TEXT SIZE */}
                    <div className="text-xs text-blue-400 font-medium">
                      {user.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  // DECREASED PADDING AND TEXT SIZE - CHANGED RED TO ROSE
                  className="px-4 py-2 rounded-full text-sm font-semibold text-rose-300 border-2 border-rose-500/50 hover:bg-rose-900 hover:border-rose-400 hover:text-rose-200 hover:shadow-[0_0_20px_rgba(244,63,94,0.7)] transition-all duration-300 transform hover:scale-[1.05]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-5 pl-5 border-l border-purple-500/20">
                {/* FANCY: Sign In button with a subtle dark background and strong blue hover glow - DECREASED PADDING AND TEXT SIZE */}
                <Link
                  to="/signin"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] transition-all duration-300 transform hover:scale-[1.02] bg-gray-800/50"
                >
                  Sign In
                </Link>
                {/* FANCY: Get Started button with a gradient, lift, and a brighter shimmer effect on hover - DECREASED PADDING AND TEXT SIZE */}
                <Link
                  to="/register"
                  className="relative overflow-hidden px-6 py-2.5 rounded-full text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-blue-500 shadow-xl shadow-purple-700/50 hover:shadow-2xl hover:shadow-purple-700/80 transform hover:-translate-y-1 transition-all duration-500 ease-in-out active:scale-[0.98] after:absolute after:inset-0 after:-translate-x-full hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:duration-700 after:ease-in-out"
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
              // DECREASED PADDING AND ICON SIZE
              className={`inline-flex items-center justify-center p-2 rounded-xl text-blue-400 bg-gray-800/50 hover:bg-purple-600/20 transition-all duration-300 ease-in-out transform hover:scale-105 ${isMenuOpen ? 'rotate-90 text-white' : ''} border border-purple-500/30`}
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

      {/* Mobile Menu with enhanced slide-down and fade-in animation */}
      <div className={`lg:hidden transition-all duration-500 ease-out transform ${isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'} overflow-hidden`}>
        {/* FANCY: Mobile Menu Dropdown Panel with deeper background and strong accent border */}
        <div className="bg-gray-950/95 backdrop-blur-2xl rounded-b-3xl shadow-2xl border-t-2 border-purple-700/50 mt-0 mx-2 mb-2 p-4 space-y-2">
          
          {/* Mobile Navigation Links - DECREASED PADDING AND TEXT SIZE */}
          <Link to="/" className={`block text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${isActiveLink('/') ? 'bg-purple-600/90 text-white shadow-md shadow-purple-500/30' : 'text-gray-300 hover:bg-purple-600/10 hover:text-blue-300'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <a href="#services" className="block text-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-purple-600/10 hover:text-blue-300 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#portfolio" className="block text-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-purple-600/10 hover:text-blue-300 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
          <a href="#gallery" className="block text-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-purple-600/10 hover:text-blue-300 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Gallery</a>
          <a href="#testimonials" className="block text-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-purple-600/10 hover:text-blue-300 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Testimonials</a>

          {/* User Section */}
          {user ? (
            <div className="pt-4 border-t border-purple-500/20">
              <div className="flex items-center space-x-3 px-3 py-2.5 bg-gray-800/50 rounded-lg">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  {/* DECREASED TEXT SIZE */}
                  <div className="text-sm font-semibold text-gray-100 truncate">{getUserDisplayName()}</div>
                  <div className="text-xs text-blue-400 truncate">{user.email || 'user@example.com'}</div>
                </div>
              </div>
              <button 
                onClick={handleSignOut} 
                // DECREASED PADDING AND TEXT SIZE - CHANGED RED TO ROSE
                className="w-full mt-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-300 bg-rose-900/40 hover:bg-rose-900/60 transition-colors duration-200 text-center shadow-lg shadow-rose-900/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-purple-500/20 space-y-3">
              <Link 
                to="/signin" 
                // DECREASED PADDING AND TEXT SIZE
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200 text-center" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                // DECREASED PADDING AND TEXT SIZE
                className="block px-3 py-2.5 rounded-lg text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-blue-500 shadow-xl shadow-purple-700/50 transition-all duration-200 text-center transform hover:scale-[1.01]"
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