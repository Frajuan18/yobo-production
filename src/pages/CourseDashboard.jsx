import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// --- ENHANCED COURSE DATA WITH ETB PRICING ---
const coursesData = [
  {
    id: 1,
    title: "YouTube Automation Mastery",
    category: "YouTube",
    description:
      "Master YouTube channel growth, content strategy, and automation systems. Learn to build profitable YouTube channels with proven automation techniques.",
    level: "Intermediate",
    image: "📺",
    color: "from-red-500 to-red-600",
    telegram: "@Fra_juan",
    features: [
      "Channel Strategy",
      "Content Automation",
      "Growth Hacking",
      "Monetization",
    ],
    price: 4300,
    duration: "8 weeks",
    lessons: 24,
  },
  {
    id: 2,
    title: "Professional Video Editing",
    category: "Video Editing",
    description:
      "Master professional video editing workflow from raw footage to final cut. Learn cutting-edge software and creative storytelling techniques for YouTube and social media.",
    level: "Beginner to Advanced",
    image: "🎬",
    color: "from-purple-500 to-fuchsia-600",
    telegram: "@Fra_juan",
    features: [
      "Professional Workflow",
      "Software Mastery",
      "Storytelling",
      "Color Grading",
    ],
    price: 5090,
    duration: "6 weeks",
    lessons: 20,
  },
  {
    id: 3,
    title: "Cinematic Camera & Cinematography",
    category: "Cinematography",
    description:
      "Master professional camera techniques, lens selection, and cinematic movement. Learn to create breathtaking cinematic shots that tell powerful visual stories.",
    level: "Advanced",
    image: "🎥",
    color: "from-amber-500 to-orange-600",
    telegram: "@Fra_juan",
    features: [
      "Camera Operation",
      "Lens Science",
      "Movement Techniques",
      "Shot Composition",
    ],
    price: 6000,
    duration: "10 weeks",
    lessons: 28,
  },
  {
    id: 4,
    title: "Lighting & Visual Storytelling",
    category: "Cinematography",
    description:
      "Transform ordinary scenes into cinematic masterpieces through advanced lighting techniques and visual narrative development.",
    level: "Advanced",
    image: "💡",
    color: "from-blue-500 to-cyan-600",
    telegram: "@Fra_juan",
    features: [
      "Lighting Setup",
      "Color Theory",
      "Mood Creation",
      "Visual Narrative",
    ],
    price: 4500,
    duration: "8 weeks",
    lessons: 24,
  },
  {
    id: 5,
    title: "Sound Design & Audio Production",
    category: "Sound",
    description:
      "Create immersive audio experiences with professional mixing, mastering, and sound design techniques for film and media.",
    level: "All Levels",
    image: "🎵",
    color: "from-green-500 to-emerald-600",
    telegram: "@Fra_juan",
    features: ["Audio Mixing", "Sound Design", "Mastering", "Foley Artistry"],
    price: 3800,
    duration: "7 weeks",
    lessons: 22,
  },
  {
    id: 6,
    title: "Film Making Fundamentals",
    category: "Film Making",
    description:
      "Complete guide to film production from script development to final cut. Learn directing and producing workflows for professional results.",
    level: "Beginner",
    image: "🎭",
    color: "from-indigo-500 to-purple-600",
    telegram: "@Fra_juan",
    features: ["Script Writing", "Directing", "Producing", "Post-Production"],
    price: 3500,
    duration: "5 weeks",
    lessons: 18,
  },
];

// --- ENHANCED COURSE CARD COMPONENT WITH ETB PRICING ---
const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRegister = () => {
    window.open(`https://t.me/${course.telegram.replace("@", "")}`, "_blank");
  };

  return (
    <div
      className="relative group cursor-pointer h-full flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-105`}
      ></div>

      {/* Main Card - flex-1 to make all cards equal height */}
      <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/30 hover:scale-[1.02] flex-1 flex flex-col">
        {/* Header with Icon and Category */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div
              className={`relative w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}
            >
              {course.image}
              <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white/80 bg-white/10 px-2 sm:px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                {course.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-2 leading-tight line-clamp-2">
                {course.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description - flex-grow to push button to bottom */}
        <div className="flex-grow mb-4 sm:mb-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Course Info Stats */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="whitespace-nowrap">{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="whitespace-nowrap">
                {course.lessons} lessons
              </span>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {course.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs text-white/70 bg-white/5 px-2 sm:px-3 py-1 rounded-full border border-white/10 whitespace-nowrap"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Pricing Section */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-3 sm:p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-1 sm:space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  ETB {course.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  one-time
                </span>
              </div>
              <div className="flex items-center text-xs text-green-400">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="whitespace-nowrap">Lifetime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Level and Button - mt-auto to push to bottom */}
        <div className="flex justify-between items-center mt-auto space-x-2">
          <span className="text-xs font-semibold text-white/60 bg-black/30 px-2 sm:px-3 py-1 rounded-full border border-white/10 whitespace-nowrap flex-shrink-0">
            {course.level}
          </span>
          <button
            onClick={handleRegister}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center backdrop-blur-sm text-sm sm:text-base whitespace-nowrap flex-shrink-0"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.139c-.224-.074-3.645-1.342-6.902-1.995-1.769-.355-3.33-.54-3.403-.504-.668.162-.728.587-.136.897 2.216 1.176 3.287 1.843 3.445 3.075.105.82.173 1.074.392 1.074.258 0 .666-.333 1.374-1.105 1.832-1.985 2.539-2.141 3.768-1.104.836.71.597 1.314-.5 1.314-.307 0-.625-.075-.833-.166-.527-.225-1.007-.371-1.071-.289-.18.18.434 1.256.957 1.714.664.584.994.7 1.5.7 1.008 0 1.688-.682 1.688-1.688 0-.729-.459-1.047-1.169-1.047z" />
            </svg>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PREMIUM DASHBOARD COMPONENT ---
const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("Dashboard");
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "there";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.firstName && !user?.lastName && !user?.displayName) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.displayName) {
      const names = user.displayName.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return "U";
  };

  const neonTextClass =
    "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400";

  const renderDashboardContent = () => {
    return (
      <div className="space-y-8 sm:space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight px-4">
            Welcome to Your{" "}
            <span className={neonTextClass}>Creative Studio</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Transform your creative vision into cinematic reality. Master
            professional filmmaking, camera techniques, and post-production with
            industry experts.
          </p>
        </div>

        {/* Pricing Info Banner */}
        <div className="bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-fuchsia-600/20 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/10 mx-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                💫 Professional Courses
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                All courses include lifetime access, project files, and
                certificate of completion
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                  ETB 3,500+
                </div>
                <div className="text-xs text-gray-400">Starting from</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">
                  Lifetime
                </div>
                <div className="text-xs text-gray-400">Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Courses - 3 CARDS SIDE BY SIDE WITH EQUAL HEIGHT */}
        <div className="mb-8 sm:mb-12 px-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">
              Featured <span className={neonTextClass}>Courses</span>
            </h2>
            <button
              onClick={() => setCurrentSection("Courses")}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-2 transition-all duration-300 justify-center sm:justify-start"
            >
              <span>View All</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Grid with equal height cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {coursesData.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 px-2">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
              50+
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              Hours of Content
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-2">
              1000+
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              Students Enrolled
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-fuchsia-400 mb-2">
              24/7
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              Expert Support
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-2">
              ETB 3,500+
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              Professional Pricing
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCoursesContent = () => {
    return (
      <div className="space-y-8 sm:space-y-12">
        {/* Courses Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight">
            All <span className={neonTextClass}>Courses</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive curriculum covering every aspect of modern filmmaking
            and media production.
            <span className="block text-cyan-400 font-semibold mt-2 text-sm sm:text-base">
              All courses include lifetime access and certificate of completion!
            </span>
          </p>
        </div>

        {/* Pricing Summary */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 mx-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                ETB 3,500 - 6,000
              </div>
              <div className="text-gray-300 text-sm">Course Pricing</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">
                Lifetime
              </div>
              <div className="text-gray-300 text-sm">Access Included</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">
                Certificate
              </div>
              <div className="text-gray-300 text-sm">Upon Completion</div>
            </div>
          </div>
        </div>

        {/* All Courses Grid - 3 CARDS SIDE BY SIDE WITH EQUAL HEIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 text-center relative overflow-hidden mx-2">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-fuchsia-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to <span className={neonTextClass}>Create Magic</span>?
            </h2>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-base sm:text-lg">
              Get personalized course recommendations and start your creative
              journey today.
            </p>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-md mx-auto">
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                All Courses Include
              </div>
              <div className="text-gray-300 text-xs sm:text-sm space-y-1">
                <div>✓ Lifetime access & updates</div>
                <div>✓ Certificate of completion</div>
                <div>✓ Project files & resources</div>
                <div>✓ 24/7 expert support</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => window.open("https://t.me/Fra_juan", "_blank")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.139c-.224-.074-3.645-1.342-6.902-1.995-1.769-.355-3.33-.54-3.403-.504-.668.162-.728.587-.136.897 2.216 1.176 3.287 1.843 3.445 3.075.105.82.173 1.074.392 1.074.258 0 .666-.333 1.374-1.105 1.832-1.985 2.539-2.141 3.768-1.104.836.71.597 1.314-.5 1.314-.307 0-.625-.075-.833-.166-.527-.225-1.007-.371-1.071-.289-.18.18.434 1.256.957 1.714.664.584.994.7 1.5.7 1.008 0 1.688-.682 1.688-1.688 0-.729-.459-1.047-1.169-1.047z" />
                </svg>
                Contact Admin to Enroll
              </button>
              <button
                onClick={() => setCurrentSection("Dashboard")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-cyan-500 rounded-full mix-blend-lighten filter blur-[120px] sm:blur-[180px] opacity-30 animate-pulse"></div>
        <div className="absolute top-[200px] right-[-400px] w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-fuchsia-500 rounded-full mix-blend-lighten filter blur-[150px] sm:blur-[200px] opacity-25 animate-pulse delay-1500"></div>
        <div className="absolute bottom-[-250px] left-[10%] sm:left-[20%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-purple-600 rounded-full mix-blend-lighten filter blur-[140px] sm:blur-[190px] opacity-35 animate-pulse delay-3000"></div>
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-3 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Premium Header */}
        <header className="mb-8 sm:mb-12">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
            <Link
              to="/"
              className="flex items-center group justify-center sm:justify-start"
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-black text-xl sm:text-2xl">
                  Y
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
              </div>
              <span
                className={`ml-3 sm:ml-4 text-xl sm:text-2xl font-black tracking-widest ${neonTextClass}`}
              >
                YOBO STUDIOS
              </span>
            </Link>

            {/* User Info */}
            <div className="flex items-center space-x-4 sm:space-x-6 justify-center sm:justify-end">
              <div className="text-right hidden sm:block">
                <p className="text-gray-400 text-sm font-medium">
                  Welcome back
                </p>
                <p className="text-cyan-400 font-bold text-base sm:text-lg truncate max-w-[150px]">
                  {getUserDisplayName()}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                  className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl relative group hover:scale-110 transition-transform duration-300"
                >
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {getUserInitials()}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                </button>

                {/* Logout Dropdown */}
                {showLogoutDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-50">
                    <div className="p-4">
                      <div className="text-sm text-gray-300 mb-3">
                        Signed in as
                      </div>
                      <div className="text-white font-semibold text-sm truncate">
                        {getUserDisplayName()}
                      </div>
                      <div className="text-gray-400 text-xs truncate mt-1">
                        {user?.email}
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-2">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors duration-200 flex items-center text-sm"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
            {["Dashboard", "Courses"].map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 overflow-hidden group ${
                  currentSection === section
                    ? "text-white shadow-2xl"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {currentSection === section && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-fuchsia-600/30 backdrop-blur-sm rounded-2xl"></div>
                )}
                <span className="relative z-10">{section}</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transform transition-transform duration-300 ${
                    currentSection === section
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <main className="pb-16 sm:pb-20">
          {currentSection === "Dashboard" && renderDashboardContent()}
          {currentSection === "Courses" && renderCoursesContent()}
        </main>
      </div>

      {/* Close dropdown when clicking outside */}
      {showLogoutDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLogoutDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;