import React from 'react';

// Main component, now named ServicesSection
const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: 'Social Media Management',
      description: 'Engaging content and strategy to grow your online presence.',
      // User Group Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-2.87M17 20H7m10 0v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v2m6 0H9m11 0v-6a3 3 0 00-3-3H9a3 3 0 00-3 3v6m0 0H7m14 0h-2M12 12a3 3 0 01-3 3H9m3 0a3 3 0 003 3h.083m-3.083 0a3 3 0 01-3-3v-2.083" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Documentary',
      description: 'Compelling, cinematic storytelling that informs and inspires.',
      // Film Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Event Videos',
      description: 'Professional coverage to capture the energy and highlights of your events.',
      // Video Camera Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 18h11a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Music Videos',
      description: 'Creative and dynamic song clips to bring your music to life visually.',
      // Music Note Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Film Production',
      description: 'Full-scale production for YouTube content, short films, and cinema.',
      // Play Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 6,
      name: 'Film Classes',
      description: 'Hands-on training and workshops to master the art of filmmaking.',
      // Academic Cap Icon
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  // Updated Keyframes for the pulsing blob aesthetic and the shine effect
  const style = (
    <style>
      {`
        @keyframes blob-pulse {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.4; }
          50% { transform: scale(1.1) translate(20px, -20px); opacity: 0.6; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.4; }
        }
        @keyframes blob-pulse-2 {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.3; }
          50% { transform: scale(1.2) translate(-30px, 30px); opacity: 0.5; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.3; }
        }
        @keyframes blob-pulse-3 {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.5; }
          50% { transform: scale(0.9) translate(10px, 40px); opacity: 0.7; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.5; }
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
        
        /* Utility classes for applying the animations */
        .animate-blob-pulse { animation: blob-pulse 10s infinite ease-in-out alternate; }
        .animate-blob-pulse-2 { animation: blob-pulse-2 15s infinite ease-in-out alternate-reverse; }
        .animate-blob-pulse-3 { animation: blob-pulse-3 12s infinite ease-in-out; }
        .animate-\\[shine_5s_linear_infinite\\] { animation: shine 5s linear infinite; }
      `}
    </style>
  );

  // Component for a single Service Card
  const ServiceCard = ({ service }) => {
    return (
      <a 
        key={service.id}
        href="#"
        className="relative block group hover:z-20 transform hover:-translate-y-2 transition-transform duration-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 focus-visible:ring-offset-black rounded-xl"
      >
        {/* 1. The Glowing Border Layer (revealed on hover) */}
        <div 
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-indigo-500/80 to-blue-500/80 opacity-0 group-hover:opacity-100 transition duration-500 filter blur-lg"
        ></div>
        
        {/* 2. The Main Card Content */}
        <div 
          className="relative h-full p-8 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500 shadow-2xl shadow-gray-900/50 transition-all duration-300"
        >
          <div>
            {/* Icon Container with Blue/Purple Accent */}
            <span className="rounded-xl inline-flex p-4 bg-purple-600/30 text-purple-400 ring-4 ring-gray-900/80 shadow-inner shadow-blue-500/20">
              {service.icon}
            </span>
          </div>
          <div className="mt-8">
            {/* Larger, bolder title text */}
            <h3 className="text-2xl font-bold text-gray-50 group-hover:text-blue-300 transition-colors">
              {service.name}
            </h3>
            <p className="mt-3 text-base text-gray-400">
              {service.description}
            </p>
          </div>
          {/* Arrow link indicator */}
          <div className="mt-4 flex justify-end">
            <span className="text-purple-400 group-hover:text-blue-400 transition-colors">
              {/* Arrow Right Icon */}
              <svg className="w-6 h-6 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    );
  };

  return (
    // Changed background to black and added min-h-screen for full view
    <div className="relative bg-black overflow-hidden min-h-screen font-sans" id="services">
      {style}
      
      {/* --- FANCY AS F*** BACKGROUND BLOBS --- */}
      <div className="absolute inset-0 z-0 opacity-80">
        {/* Top Left Cyan Blob */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-lighten filter blur-[150px] opacity-40 animate-blob-pulse"></div>
        {/* Top Right Fuchsia Blob */}
        <div className="absolute top-[100px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full mix-blend-lighten filter blur-[180px] opacity-30 animate-blob-pulse-2"></div>
        {/* Bottom Left Purple Blob */}
        <div className="absolute bottom-[-150px] left-[15%] w-[450px] h-[450px] bg-purple-600 rounded-full mix-blend-lighten filter blur-[160px] opacity-50 animate-blob-pulse-3"></div>
A    </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-purple-400 tracking-wide uppercase">
            Our Expertise
          </h2>
          {/* UPDATED: Main Title with Gradient/Shine and Neon Shadow Effect */}
          <p className="mt-1 text-5xl font-extrabold text-gray-100 sm:text-6xl sm:tracking-tight md:text-7xl">
            {/* First part: Cyan/Fuchsia gradient with Cyan glow */}
            <span className="block xl:inline drop-shadow-[0_0_10px_rgba(59,197,222,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Elevating Your
            </span>{' '}
            {/* Second part: Pink/Fuchsia/Purple gradient with Shine animation and Fuchsia glow */}
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 animate-[shine_5s_linear_infinite] xl:inline drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]" 
              style={{ backgroundSize: '200% auto' }}
            >
              Digital Presence
            </span>
          </p>
A         <p className="max-w-4xl mt-6 mx-auto text-xl text-gray-300">
            From ideation to deployment, we build sophisticated, scalable platforms designed for performance and user delight.
          </p>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          </div>
      </div>
    </div>
  );
};

export default ServicesSection;