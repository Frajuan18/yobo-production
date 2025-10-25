import React from 'react';
import mountainpic from '../assets/landscape-shot-simien-mountains-national-park-amhara-ethiopia.jpg'
import launch from '../assets/view-3d-space-rocket-model.jpg'
import campaign from '../assets/beautiful-dark-skinned-woman-surrounded-by-clothes-rack.jpg'
import song from '../assets/view-man-playing-electric-guitar-instrument.jpg'
import film from '../assets/person-creating-online-content-with-their-pets.jpg'
import filmmake from '../assets/view-3d-movie-director-s-chair.jpg'
// Main component
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  // --- Project Data (UPDATED) ---
  const projects = [
    {
      id: 1,
      title: 'The Mountain\'s Echo',
      description: 'A feature documentary exploring the culture of remote mountain communities.',
      category: 'Filmmaking',
      image: mountainpic,
      technologies: ['4K Cinema', 'Adobe Premiere', 'DaVinci Resolve'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Apex Tech Launch',
      description: 'High-energy event coverage for a major corporate product launch.',
      category: 'Commercial',
      image: launch,
      technologies: ['Multi-cam', 'Live Streaming', 'After Effects'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Vivid Apparel Campaign',
      description: 'Full-service social media management, creating engaging video and photo content.',
      category: 'Digital Strategy',
      image: campaign, // No image for this one
      technologies: ['Hootsuite', 'Adobe Creative Suite', 'Analytics'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Starlight - Song Video',
      description: 'A cinematic music video with high-concept visuals and narrative.',
      category: 'Commercial',
      image: song, // No image for this one
      technologies: ['Cinema Drones', 'Gimbal', 'Color Grading'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Crossroads - Short Film',
      description: 'An award-winning short film produced for the festival circuit.',
      category: 'Filmmaking',
      image: film, // No image for this one
      technologies: ['Screenwriting', 'RED Camera', 'Sound Design'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Filmmaker Masterclass',
      description: 'An online educational series covering the fundamentals of film production.',
      category: 'Digital Strategy',
      image: filmmake, // No image for this one
      technologies: ['Teachable', 'Course Design', 'YouTube'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  // --- Categories (UPDATED) ---
  const categories = ['All', 'Filmmaking', 'Commercial', 'Digital Strategy'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="relative bg-black overflow-hidden min-h-screen font-sans py-24">
      {/* --- DYNAMIC BACKGROUND BLOBS (BLUE/PURPLE) --- */}
      <div className="absolute inset-0 z-0 opacity-80">
        {/* Top Left Blue Blob */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-lighten filter blur-[150px] opacity-40 animate-pulse"></div>
        {/* Top Right Fuchsia Blob */}
        <div className="absolute top-[100px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-[180px] opacity-30 animate-pulse delay-1000"></div>
        {/* Bottom Left Indigo Blob */}
        <div className="absolute bottom-[-150px] left-[15%] w-[450px] h-[450px] bg-indigo-600 rounded-full mix-blend-lighten filter blur-[160px] opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-400 tracking-wide uppercase">
            Our Work
          </h2>
          {/* UPDATED: Title with Blue/Purple Gradient/Shine and Neon Shadow Effect */}
          <p className="mt-1 text-5xl font-extrabold sm:text-6xl sm:tracking-tight md:text-7xl">
            {/* First part: Gradient with Blue/Indigo glow */}
            <span className="block xl:inline drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Recent
            </span>{' '}
            {/* Second part: Gradient with Shine Animation and deeper Purple glow */}
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 xl:inline drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]" 
            >
              Portfolio
            </span>
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            Explore our latest projects and see how we've helped businesses succeed across different sectors.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative group px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 md:text-base md:px-8 
                ${category === activeFilter
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-blue-400 shadow-lg shadow-indigo-500/50 ring-2 ring-indigo-500/80 transform scale-105' // Applied blue/purple gradient
                  : 'text-gray-300 bg-gray-800/50 border border-gray-700 hover:border-indigo-500/50 hover:text-indigo-400 hover:shadow-md hover:shadow-indigo-500/20' // Applied blue/purple hover
                }`}
            >
              {category}
              {category === activeFilter && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[3px] bg-white opacity-70 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl shadow-gray-900/80 hover:shadow-indigo-500/20 transition-all duration-300 group border border-gray-700 hover:border-indigo-500/50 transform hover:-translate-y-1"
            >
              {/* Project Image Area */}
              <div className="relative h-48 bg-gray-900/50 overflow-hidden">
                {project.image ? (
                  // If image exists, show the image
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-gray-900 opacity-60"></div>
                  </>
                ) : (
                  // If no image, show placeholder with icon
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-gray-900 opacity-60"></div>
                    <div className="text-indigo-400 text-center relative z-10 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                      <svg className="w-16 h-16 opacity-80 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                      <span className="text-sm font-medium mt-2 block text-gray-400">Project Image</span>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/70 text-indigo-300 border border-indigo-700/50 drop-shadow-[0_0_5px_rgba(99,102,241,0.3)]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-300 group-hover:text-fuchsia-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="mt-2 text-gray-400 text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-400 p-12 bg-gray-900/70 rounded-xl border border-gray-700">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* CTA Section - Dark Mode Themed */}
       
      </div>
    </div>
  );
};

export default Portfolio;