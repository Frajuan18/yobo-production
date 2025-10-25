import React, { useState, useEffect } from 'react';

// Main application component, renamed to App for environment consistency
const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Changed submission status colors (emerald/red) to fit the dark, moody theme better
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle the form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setIsSubmitting(true);

    try {
      // Simulate form submission (e.g., a POST request to an API endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000)); 

      // Success
      setSubmissionStatus('success');
      
      // Clear the form data
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        message: ''
      });

    } catch (error) {
      // Error handling
      setSubmissionStatus('error');
      console.error("Form submission failed:", error);

    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setSubmissionStatus('idle'), 5000);
    }
  };

  // Data for the contact information column
  const contactInfo = [
    {
      icon: (
        // Phone Icon (lucide-react style SVG)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2 2A20 20 0 0 1 2 4a2 2 0 0 1 2-2h3.18a2 2 0 0 1 1.92 1.48l.74 3a2 2 0 0 1-.42 1.93l-1.92 1.92a17 17 0 0 0 8.01 8.01l1.92-1.92a2 2 0 0 1 1.93-.42l3 .74A2 2 0 0 1 22 16.92z"/></svg>
      ),
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: (
        // Mail Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      ),
      title: 'Email',
      details: 'hello@yoboproduction.com',
      description: 'Online support'
    },
    {
      icon: (
        // Map Pin Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
      title: 'Office',
      details: '123 Design Street',
      description: 'Creative District, CD 12345'
    }
  ];

  // Simple Social SVG Icon for Twitter
  const TwitterIcon = (props) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22.46 6c-.77.35-1.6.58-2.47.65.89-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.73 1.04-.79-.84-1.92-1.37-3.15-1.37-2.38 0-4.31 1.93-4.31 4.31 0 .34.04.67.11.99-3.58-.18-6.75-1.89-8.88-4.48-.37.64-.58 1.38-.58 2.18 0 1.49.76 2.81 1.91 3.58-.71-.02-1.38-.22-1.97-.54v.05c0 2.09 1.49 3.83 3.47 4.22-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.04 3.03-1.49 1.17-3.37 1.86-5.41 1.86-.35 0-.7-.02-1.04-.06C2.9 20.25 5.12 21 7.54 21c9.05 0 14-7.48 14-14 0-.21-.01-.43-.03-.64.96-.69 1.79-1.54 2.45-2.52z" />
    </svg>
  );

  // Skeleton Components
  const HeaderSkeleton = () => (
    <div className="text-center animate-pulse">
      {/* Title Block Skeleton */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        {/* Pill Skeleton */}
        <div className="h-8 bg-slate-700 rounded-full w-32"></div>
        {/* Main Title Skeleton */}
        <div className="h-12 bg-slate-700 rounded-lg w-64"></div>
      </div>
      
      {/* Subtitle Skeleton */}
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );

  const ContactInfoSkeleton = () => (
    <div className="p-6 rounded-2xl shadow-2xl bg-slate-800 border border-slate-700 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-slate-700 rounded w-32 mb-4"></div>
      
      {/* Description Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-4/6"></div>
      </div>

      {/* Contact Items Skeleton */}
      <div className="mt-8 space-y-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start p-4 bg-slate-700 rounded-xl">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
            </div>
            <div className="ml-4 space-y-2 flex-1">
              <div className="h-5 bg-slate-600 rounded w-24"></div>
              <div className="h-4 bg-slate-600 rounded w-40"></div>
              <div className="h-3 bg-slate-600 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links Skeleton */}
      <div className="mt-12">
        <div className="h-6 bg-slate-700 rounded w-40 mb-4"></div>
        <div className="flex space-x-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-10 w-10 bg-slate-700 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const FormSkeleton = () => (
    <div className="bg-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-700 animate-pulse">
      {/* Form Grid Skeleton */}
      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index}>
              <div className="h-4 bg-slate-700 rounded w-24 mb-2"></div>
              <div className="h-12 bg-slate-700 rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index}>
              <div className="h-4 bg-slate-700 rounded w-24 mb-2"></div>
              <div className="h-12 bg-slate-700 rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Timeline Select */}
        <div>
          <div className="h-4 bg-slate-700 rounded w-28 mb-2"></div>
          <div className="h-12 bg-slate-700 rounded-xl"></div>
        </div>

        {/* Message Textarea */}
        <div>
          <div className="h-4 bg-slate-700 rounded w-32 mb-2"></div>
          <div className="h-32 bg-slate-700 rounded-xl"></div>
        </div>

        {/* Submit Button */}
        <div className="h-12 bg-slate-700 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    // ADDED ID="contact" HERE for navbar access
    <div className="min-h-screen bg-gray-900 antialiased bg-glow" id="contact">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        /* Custom CSS for Background Glow Effect */
        .bg-glow {
          position: relative;
          overflow: hidden;
        }
        .bg-glow::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -20%;
          width: 60%;
          height: 60%;
          /* Blue/Violet Radial Gradient */
          background: radial-gradient(circle, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.15), transparent 70%); 
          animation: background-move 15s infinite alternate;
          z-index: 0;
          pointer-events: none; /* Ensure it doesn't interfere with interaction */
        }
        /* Defines the movement for the background glow */
        @keyframes background-move {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(100px, 150px) scale(1.1); opacity: 1; }
          100% { transform: translate(200px, 0) scale(1); opacity: 0.8; }
        }

        /* Custom CSS for Main Title Text Animation (Gradient Shift) */
        .animated-title {
          /* Purple to Blue gradient */
          background-image: linear-gradient(90deg, #a78bfa, #6366f1, #a78bfa); 
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: subtle-gradient-shift 4s ease-in-out infinite;
          background-size: 200% auto;
          display: inline-block;
          font-weight: 800;
        }

        /* Custom CSS for Sub-title Text Gradient */
        .subtitle-glow {
            /* Light gray/white text with a subtle blue/violet shadow */
            color: #d1d5db; /* A slightly brighter gray */
            text-shadow: 0 0 8px rgba(99, 102, 241, 0.6), /* Indigo glow */
                         0 0 12px rgba(139, 92, 246, 0.4); /* Violet glow */
        }

        /* Defines the horizontal shift for the gradient text */
        @keyframes subtle-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          {isLoading ? (
            <HeaderSkeleton />
          ) : (
            <div className="text-center">
              
              {/* Title Block: Flex container for the pill and the main title */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                   {/* 1. H2 is now a block element, styled as a pill for 'Get In Touch'
                     2. Added shadow and increased padding to match the reference images
                   */}
                  <h2 className="text-sm font-semibold text-blue-400 tracking-wide uppercase rounded-full inline-block bg-blue-900/50 px-4 py-2 shadow-lg shadow-indigo-500/30">
                    Get In Touch
                  </h2>
                  
                  {/* Main Title: Increased margin-top to align it better with the pill
                     (removed mt-2 from here, as mt-4 is on the wrapping div)
                  */}
                  <p className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight animated-title">
                    Let's Work Together
                  </p>
              </div>
              
              {/* Subtitle */}
              <p className="max-w-2xl mt-4 mx-auto text-lg subtitle-glow">
                Ready to start your project? Fill out the form below or contact us directly.
              </p>
            </div>
          )}

          {/* Main Content: Info & Form */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Information (Left Column) */}
            {isLoading ? (
              <ContactInfoSkeleton />
            ) : (
              <div className="p-6 rounded-2xl shadow-2xl bg-slate-800 border border-slate-700">
                <h3 className="text-2xl font-extrabold text-white mb-2">Reach Out</h3>
                <p className="mt-4 text-slate-400">
                  Our team is ready to discuss your needs. We usually respond within one business day.
                </p>

                <div className="mt-8 space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-slate-700 rounded-xl transition-shadow duration-300 hover:shadow-lg hover:bg-slate-700/80">
                      <div className="flex-shrink-0">
                        {/* Violet accent circle for icons */}
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-violet-600 text-white shadow-lg">
                          {item.icon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-slate-200 font-medium">{item.details}</p>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                      <a
                        key={social}
                        href={`#${social.toLowerCase()}`}
                        aria-label={`Follow us on ${social}`}
                        // Changed to Violet accent
                        className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <span className="sr-only">{social}</span>
                        <TwitterIcon /> {/* Using the generic Twitter icon for all */}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form (Right Column) */}
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <div className="bg-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-700">
                  {/* Submission Status Notification - Kept subtle success/error colors */}
                {submissionStatus !== 'idle' && (
                  <div className={`p-4 rounded-xl font-semibold mb-6 transition-all duration-300 shadow-lg ${
                    submissionStatus === 'success' 
                      ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' 
                      : submissionStatus === 'error' 
                      ? 'bg-red-900/50 text-red-300 border border-red-700' 
                      : 'hidden'
                  }`}>
                    {submissionStatus === 'success' 
                      ? '✓ Success! Thank you for your message. We will be in touch shortly.' 
                      : submissionStatus === 'error' 
                      ? '✗ Error! An error occurred during submission. Please check your inputs and try again.' 
                      : ''}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Form Inputs (Updated focus rings to violet-500) */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white placeholder-slate-500 appearance-none"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white placeholder-slate-500 appearance-none"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white placeholder-slate-500 appearance-none"
                        placeholder="Your organization"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-300">
                        Project Budget
                      </label>
                      <select
                        name="budget"
                        id="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="$1k - $5k">$1k - $5k</option>
                        <option value="$5k - $15k">$5k - $15k</option>
                        <option value="$15k - $30k">$15k - $30k</option>
                        <option value="$30k+">$30k+</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Timeline Select */}
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-slate-300">
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP (Urgent)</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months (Long-term planning)</option>
                    </select>
                  </div>

                  {/* Project Details / Message Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 shadow-sm bg-slate-900 text-white placeholder-slate-500"
                      placeholder="Tell us about your project, key goals, and challenges..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || submissionStatus === 'success'}
                      // Changed button colors to blue/violet
                      className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl active:shadow-lg transform active:scale-[0.99] focus:ring-offset-slate-800"
                    >
                      {isSubmitting ? (
                        <>
                          {/* Spinning loader icon */}
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : submissionStatus === 'success' ? (
                        'Sent Successfully!'
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;