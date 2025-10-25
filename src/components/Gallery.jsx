import React, { useState } from 'react';
import img1 from '../assets/DSC00317.JPG'
import img2 from '../assets/DSC00881 copy 2.jpg'
import img3 from '../assets/DSC00936 copy.jpg'
import img4 from '../assets/470197929_550973954510609_5910061024884265620_n (2).jpg'
import img5 from '../assets/480150032_595664606708210_560523426328740630_n (2).jpg'
import img6 from '../assets/DSC06073.JPG'
import img7 from '../assets/DSC06071.JPG'
import img8 from '../assets/485296784_1103092605169399_4953317176909891442_n (3).jpg'

// Main Application Component
const Gallery = () => {
  // State for the slider navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    { 
      id: 1, 
      title: 'The Mountain\'s Echo', 
      image: img1,
    },
    { 
      id: 2, 
      title: 'Starlight Music Video', 
      image: img2,
    },
    { 
      id: 3, 
      title: 'Apex Tech Launch', 
      image: img3,
    },
    { 
      id: 4, 
      title: 'Crossroads Short Film', 
      image: img4,
    },
    { 
      id: 5, 
      title: 'Vivid Apparel Campaign', 
      image: img5,
    },
    { 
      id: 6, 
      title: 'Filmmaker Masterclass', 
      image: img6,
    },
    { 
      id: 7, 
      title: 'Wilderness Documentary', 
      image: img7,
    },
    { 
      id: 8, 
      title: 'Brand Identity Package', 
      image: img8,
    },
  ];

  const filteredItems = galleryItems;

  const goToNext = () => {
    if (filteredItems.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    if (filteredItems.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };
  
  // Card dimensions: w-[22rem] (352px)
  const itemWidthInRem = 22;
  const cardHalfWidthInRem = itemWidthInRem / 2; // 11rem

  // Calculate the track transform to center the current item
  const trackTransform = filteredItems.length > 0 
    ? `translateX(calc(50% - ${cardHalfWidthInRem}rem - ${currentIndex * itemWidthInRem}rem))` 
    : 'translateX(0)';

  return (
    <div className="relative bg-black overflow-hidden min-h-screen font-sans py-24">
      
      {/* Custom CSS for 3D and blob animations */}
      <style>
        {`
          /* Blob Animations for Background */
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
          .animate-blob-pulse { animation: blob-pulse 10s infinite ease-in-out alternate; }
          .animate-blob-pulse-2 { animation: blob-pulse-2 15s infinite ease-in-out alternate-reverse; }
          .animate-blob-pulse-3 { animation: blob-pulse-3 12s infinite ease-in-out; }

          /* Custom CSS for the fancy 3D card transition */
          .slider-track {
              display: flex;
              transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              perspective: 1000px; /* Perspective on the track for depth */
          }
          .slider-item {
              flex-shrink: 0;
              width: ${itemWidthInRem}rem;
          }
          .card-base {
              transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s, box-shadow 0.3s, border-color 0.3s;
              transform-origin: center;
              transform-style: preserve-3d; /* Crucial for applying 3D rotation */
          }
          /* Custom utility classes for 3D rotation */
          .rotate-y-\\[-15deg\\] { transform: rotateY(-15deg); }
          .rotate-y-\\[15deg\\] { transform: rotateY(15deg); }
        `}
      </style>

      {/* --- DYNAMIC BACKGROUND BLOBS (BLUE/PURPLE) --- */}
      <div className="absolute inset-0 z-0 opacity-80">
        {/* Top Left Blue Blob */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-lighten filter blur-[150px] opacity-40 animate-blob-pulse"></div>
        {/* Top Right Fuchsia Blob */}
        <div className="absolute top-[100px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-[180px] opacity-30 animate-blob-pulse-2"></div>
        {/* Bottom Left Indigo Blob */}
        <div className="absolute bottom-[-150px] left-[15%] w-[450px] h-[450px] bg-indigo-600 rounded-full mix-blend-lighten filter blur-[160px] opacity-50 animate-blob-pulse-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section - Simplified */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">
            Visual Showcase
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight md:text-6xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]">
              Our Reel
            </span>
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
            A cinematic journey through our creative vision
          </p>
        </div>

        {/* SLIDER/CAROUSEL SECTION */}
        <div className="mt-16 relative w-full overflow-hidden">
          {filteredItems.length > 0 ? (
            <>
              {/* Slider Track */}
              <div 
                className="slider-track"
                style={{ transform: trackTransform }}
              >
                {filteredItems.map((item, index) => {
                  const isActive = index === currentIndex;
                  const isNext = index === currentIndex + 1;
                  const isPrev = index === currentIndex - 1;

                  let cardClasses = '';
                  let baseCardStyles = 'bg-gray-800/90 rounded-3xl overflow-hidden shadow-xl mx-auto border border-gray-700/50 hover:border-indigo-500/50';

                  if (isActive) {
                    // Active Card: Strongest Neon Glow
                    cardClasses = `scale-100 opacity-100 
                                   shadow-[0_0_40px_rgba(168,85,247,0.7),_0_0_10px_rgba(99,102,241,0.7)] 
                                   border-2 border-indigo-400/90`;
                  } else if (isPrev) {
                    // Previous card: Rotated left, slightly scaled down, soft glow
                    cardClasses = 'scale-[0.85] opacity-70 translate-x-[-15%] rotate-y-[-15deg] shadow-lg shadow-purple-500/20';
                  } else if (isNext) {
                    // Next card: Rotated right, slightly scaled down, soft glow
                    cardClasses = 'scale-[0.85] opacity-70 translate-x-[15%] rotate-y-[15deg] shadow-lg shadow-purple-500/20';
                  } else {
                    // Far away cards: Heavily scaled down, low opacity
                    cardClasses = 'scale-[0.7] opacity-30';
                  }

                  return (
                    <div key={item.id} className="slider-item">
                      <div className={`card-base ${baseCardStyles} ${cardClasses}`}>
                        
                        {/* Image Container - No blur, no text */}
                        <div className="relative h-[30rem] bg-gray-900/50 overflow-hidden">
                          {item.image ? (
                            // If image exists, show the image with minimal overlay
                            <>
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-gray-900/20 opacity-30"></div>
                            </>
                          ) : (
                            // If no image, show clean placeholder
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-gray-900/20 opacity-30"></div>
                              <div className="text-indigo-400 text-center relative z-10">
                                <svg className="w-24 h-24 opacity-60 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrev}
                aria-label="Previous project"
                className="absolute top-1/2 left-1/2 transform -translate-x-[15rem] -translate-y-1/2 p-3 bg-gray-700/80 text-white rounded-full shadow-lg shadow-indigo-500/50 hover:bg-gray-600 transition-colors duration-300 ring-2 ring-indigo-400/80 z-20 disabled:opacity-30"
                disabled={filteredItems.length <= 1}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button
                onClick={goToNext}
                aria-label="Next project"
                className="absolute top-1/2 left-1/2 transform translate-x-[12rem] -translate-y-1/2 p-3 bg-gray-700/80 text-white rounded-full shadow-lg shadow-indigo-500/50 hover:bg-gray-600 transition-colors duration-300 ring-2 ring-indigo-400/80 z-20 disabled:opacity-30"
                disabled={filteredItems.length <= 1}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {filteredItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-purple-500 w-6 shadow-md shadow-purple-500/70' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700 mx-auto max-w-lg">
              <p className="text-xl font-medium text-gray-300">No projects found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;