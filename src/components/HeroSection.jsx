import { Link } from "react-router-dom";
import cameraLogo from '../assets/view-3d-camera.png'
/**
 * HeroSection Component
 * Displays the main promotional content, background blobs, and responsive action buttons.
 * The display changes based on whether the 'user' prop is present (logged in vs. logged out).
 * Note: This component assumes the animation CSS classes (animate-blob-pulse, etc.) are available
 * in the parent scope (e.g., defined in a <style> block in the main App).
 */
const HeroSection = ({ user }) => {
  return (
    <div className="relative bg-black overflow-hidden min-h-screen flex items-center py-20">
      {/* --- FANCY AS F*** BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-80">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-lighten filter blur-[150px] opacity-40 animate-blob-pulse"></div>
        <div className="absolute top-[100px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full mix-blend-lighten filter blur-[180px] opacity-30 animate-blob-pulse-2"></div>
        <div className="absolute bottom-[-150px] left-[15%] w-[450px] h-[450px] bg-purple-600 rounded-full mix-blend-lighten filter blur-[160px] opacity-50 animate-blob-pulse-3"></div>
      </div>

      {/* Main Grid Container for Content */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
        {/* Left Column: Image Area */}
        <div className="flex items-center justify-center lg:justify-start animate-fade-in-left">
          <div className="w-full max-w-md lg:max-w-none aspect-[4/3] bg-transparent flex items-center justify-center">
              <img src={cameraLogo} alt="" />
          </div>
        </div>

        {/* Right Column: Text and Buttons */}
        <div className="text-center lg:text-left animate-fade-in-right">
          <h1 className="text-4xl tracking-tighter font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="block xl:inline drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Transform Your
            </span>{" "}
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 animate-[shine_5s_linear_infinite] xl:inline drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
              style={{ backgroundSize: "200% auto" }}
            >
              Digital Presence
            </span>
          </h1>
          <p className="mt-4 text-sm text-gray-400 sm:mt-6 sm:text-base sm:max-w-2xl sm:mx-auto md:mt-8 md:text-lg lg:mx-0 animate-fade-in-up delay-100">
            Welcome to **YOBO PRODUCTION** - where innovation meets excellence.
            We create stunning digital experiences that drive results and
            elevate your brand.
          </p>

          {user ? (
            <div className="mt-10 animate-fade-in-up delay-200">
              {/* User Welcome Card - Ultra Fancy Glassmorphism */}
              <div
                className="relative rounded-2xl p-6 border-2 border-fuchsia-500/50 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl bg-white/5
                      before:absolute before:inset-0 before:rounded-2xl before:border-4 before:border-transparent before:bg-gradient-to-tr before:from-fuchsia-500/40 before:to-cyan-400/40 before:p-[2px] before:-m-[2px] before:mask-gradient-alpha before:pointer-events-none"
              >
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-cyan-400 drop-shadow-neon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 text-center lg:text-left">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-400 drop-shadow-neon">
                      Welcome back, {user.firstName}!
                    </h3>
                    <p className="mt-1 text-base text-gray-200">
                      You're all set to explore our platform.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/dashboard" // <--- This is the current path
                    className="relative inline-flex items-center justify-center overflow-hidden px-10 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-xl shadow-fuchsia-500/40
             transform hover:scale-105 hover:-translate-y-1 transition-all duration-400 ease-in-out"
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    {/* ... SVG ... */}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
              <div className="rounded-full group">
                <Link
                  to="/register"
                  className="relative w-full flex items-center justify-center px-10 py-4 border-2 border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-2xl shadow-fuchsia-500/40 
                              transform hover:scale-105 hover:-translate-y-1 transition-all duration-400 ease-in-out"
                >
                  Get Started Free
                </Link>
              </div>
              <div className="rounded-full group">
                <Link
                  to="/signin"
                  className="relative w-full flex items-center justify-center px-10 py-4 text-base font-bold rounded-full text-cyan-400 border-2 border-cyan-500/50 
                              hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-400 
                              transform hover:scale-105 hover:-translate-y-1 ease-in-out"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
