import React, { useState, useEffect } from 'react';

// The main component, renamed to App
const Testimonial = () => {
	const [activeTestimonial, setActiveTestimonial] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate loading
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000); // 2 second loading simulation

		return () => clearTimeout(timer);
	}, []);

	// Define the style for the avatar initials to match the blue/purple theme
	const AvatarInitials = ({ name }) => {
		const initials = name.split(' ').map(n => n[0]).join('');
		return (
			<div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-purple-500/50 shadow-md transition-transform duration-300 hover:scale-105">
				{initials}
			</div>
		);
	};

	const testimonials = [
		{
			id: 1,
			name: 'Sarah Johnson',
			position: 'CEO',
			company: 'TechStart Inc.',
			content: 'YOBO PRODUCTION transformed our online presence completely. Their attention to detail and technical expertise exceeded our expectations.',
			rating: 5,
			project: 'E-commerce Platform'
		},
		{
			id: 2,
			name: 'Michael Chen',
			position: 'Product Manager',
			company: 'InnovateLabs',
			content: 'Working with YOBO PRODUCTION was a game-changer for our mobile app. They delivered ahead of schedule.',
			rating: 5,
			project: 'Mobile Fitness App'
		},
		{
			id: 3,
			name: 'Emily Rodriguez',
			position: 'Marketing Director',
			company: 'GlobalBrands',
			content: 'The team understood our vision perfectly. They created a stunning brand identity that truly represents our values.',
			rating: 5,
			project: 'Brand Identity Design'
		},
		{
			id: 4,
			name: 'David Thompson',
			position: 'Founder',
			company: 'StartUpGrid',
			content: 'Exceptional service from start to finish. YOBO PRODUCTION delivered a beautiful website with valuable insights.',
			rating: 5,
			project: 'Corporate Website'
		},
		{
			id: 5,
			name: 'Lisa Wang',
			position: 'CTO',
			company: 'DataFlow Systems',
			content: 'The dashboard they built is incredible. It\'s both beautiful and functional, making complex data easy to understand.',
			rating: 5,
			project: 'Analytics Dashboard'
		}
	];

	// Auto-rotate testimonials every 5 seconds
	useEffect(() => {
		if (!isLoading) {
			const interval = setInterval(() => {
				setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [testimonials.length, isLoading]);

	const nextTestimonial = () => {
		setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const goToTestimonial = (index) => {
		setActiveTestimonial(index);
	};

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, index) => (
			<svg
				key={index}
				className={`w-4 h-4 ${index < rating ? 'text-sky-400' : 'text-indigo-600'}`}
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		));
	};

	// Skeleton Components
	const HeaderSkeleton = () => (
		<div className="text-center animate-pulse">
			{/* Subtitle Skeleton */}
			<div className="h-5 bg-gray-700 rounded-full w-56 mx-auto mb-4"></div>
			
			{/* Main Title Skeleton */}
			<div className="h-10 bg-gray-700 rounded-lg w-64 mx-auto mb-4"></div>
			
			{/* Description Skeleton */}
			<div className="max-w-xl mx-auto space-y-2">
				<div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
				<div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
			</div>
		</div>
	);

	const MainTestimonialSkeleton = () => (
		<div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-gray-900/50 animate-pulse">
			<div className="max-w-3xl mx-auto text-center">
				{/* Quote Icon Skeleton */}
				<div className="mb-6">
					<div className="w-12 h-12 bg-gray-700 rounded-full mx-auto"></div>
				</div>

				{/* Content Skeleton */}
				<div className="space-y-3 mb-8">
					<div className="h-4 bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
					<div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
				</div>

				{/* Rating Skeleton */}
				<div className="mt-8 flex justify-center space-x-1">
					{[...Array(5)].map((_, index) => (
						<div key={index} className="w-4 h-4 bg-gray-700 rounded"></div>
					))}
				</div>

				{/* Client Info Skeleton */}
				<div className="mt-6">
					<div className="flex items-center justify-center">
						<div className="flex-shrink-0">
							<div className="h-12 w-12 bg-gray-700 rounded-full"></div>
						</div>
						<div className="ml-3 text-left space-y-2">
							<div className="h-4 bg-gray-700 rounded w-32"></div>
							<div className="h-3 bg-gray-700 rounded w-24"></div>
							<div className="h-3 bg-gray-700 rounded w-20"></div>
						</div>
					</div>
				</div>

				{/* Project Info Skeleton */}
				<div className="mt-4">
					<div className="h-6 bg-gray-700 rounded-full w-48 mx-auto"></div>
				</div>
			</div>
		</div>
	);

	const GridTestimonialSkeleton = () => (
		<div className="bg-indigo-900/40 rounded-lg shadow-lg p-5 border border-indigo-700/50 backdrop-blur-sm animate-pulse">
			{/* Rating Skeleton */}
			<div className="flex items-center space-x-1 mb-3">
				{[...Array(5)].map((_, index) => (
					<div key={index} className="w-3 h-3 bg-gray-700 rounded"></div>
				))}
			</div>

			{/* Content Skeleton */}
			<div className="space-y-2 mb-4">
				<div className="h-3 bg-gray-700 rounded w-full"></div>
				<div className="h-3 bg-gray-700 rounded w-5/6"></div>
				<div className="h-3 bg-gray-700 rounded w-4/6"></div>
			</div>

			{/* Client Info Skeleton */}
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<div className="h-8 w-8 bg-gray-700 rounded-full"></div>
				</div>
				<div className="ml-3 space-y-1">
					<div className="h-3 bg-gray-700 rounded w-20"></div>
					<div className="h-2 bg-gray-700 rounded w-16"></div>
				</div>
			</div>
		</div>
	);

	const StatsSkeleton = () => (
		<div className="mt-16 bg-gray-800/40 rounded-xl shadow-xl p-6 border border-gray-600/50 relative overflow-hidden animate-pulse">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
				{[...Array(4)].map((_, index) => (
					<div key={index}>
						<div className="h-8 bg-gray-700 rounded w-16 mx-auto mb-2"></div>
						<div className="h-3 bg-gray-700 rounded w-24 mx-auto"></div>
					</div>
				))}
			</div>
		</div>
	);

	const NavigationSkeleton = () => (
		<>
			{/* Navigation Arrows Skeleton */}
			<div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gray-800/50 rounded-full p-3 border border-gray-600/50 hidden lg:block animate-pulse">
				<div className="w-5 h-5 bg-gray-700 rounded"></div>
			</div>
			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gray-800/50 rounded-full p-3 border border-gray-600/50 hidden lg:block animate-pulse">
				<div className="w-5 h-5 bg-gray-700 rounded"></div>
			</div>

			{/* Dots Indicator Skeleton */}
			<div className="mt-8 flex justify-center space-x-2">
				{[...Array(5)].map((_, index) => (
					<div
						key={index}
						className="w-2 h-2 bg-gray-700 rounded-full animate-pulse"
					/>
				))}
			</div>
		</>
	);

	const currentTestimonial = testimonials[activeTestimonial];

	return (
		// ADDED ID="testimonials" HERE for navbar access
		<div className="bg-gray-950 py-16 font-sans min-h-screen flex items-center" id="testimonials">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
				{/* Header */}
				{isLoading ? (
					<HeaderSkeleton />
				) : (
					<div className="text-center">
						<h2 className="text-sm font-semibold text-sky-400 tracking-wide uppercase">
							Client Success Stories
						</h2>
						<p className="mt-1 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400 sm:text-5xl sm:tracking-tight animate-pulse-slow">
							Trusted by Innovators
						</p>
						<p className="max-w-xl mt-4 mx-auto text-lg text-indigo-300">
							Hear directly from the people who trust us to build their digital future.
						</p>
					</div>
				)}

				{/* Main Testimonial Carousel */}
				<div className="mt-12 relative">
					{isLoading ? (
						<>
							<NavigationSkeleton />
							<MainTestimonialSkeleton />
						</>
					) : (
						<>
							{/* Navigation Arrows */}
							<button
								onClick={prevTestimonial}
								className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 
												bg-indigo-900/80 text-sky-400 rounded-full p-3 shadow-xl shadow-indigo-500/30 
												hover:bg-indigo-800/80 transition-all duration-300 border border-indigo-700/50 
												hidden lg:block active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
								aria-label="Previous Testimonial"
							>
								<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>

							<button
								onClick={nextTestimonial}
								className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 
												bg-indigo-900/80 text-sky-400 rounded-full p-3 shadow-xl shadow-indigo-500/30 
												hover:bg-indigo-800/80 transition-all duration-300 border border-indigo-700/50 
												hidden lg:block active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
								aria-label="Next Testimonial"
							>
								<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>

							{/* Testimonial Card - Made Smaller */}
							<div
								key={currentTestimonial.id}
								className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 
												shadow-2xl shadow-purple-500/20 
												transition-all duration-700 ease-out 
												transform hover:scale-[1.01] hover:shadow-purple-500/40 overflow-hidden
												before:absolute before:inset-0 before:rounded-2xl 
												before:border-2 before:border-transparent 
												before:bg-gradient-to-tr before:from-sky-400/40 before:to-purple-600/40 
												before:p-[1px] before:-m-[1px] before:mask-gradient-alpha before:pointer-events-none"
							>
								<div className="max-w-3xl mx-auto text-center relative z-10">
									
									{/* Quote Icon - Made Smaller */}
									<div className="mb-6">
										<svg className="w-12 h-12 text-purple-400 mx-auto transform rotate-180 opacity-70" fill="currentColor" viewBox="0 0 24 24">
											<path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
										</svg>
									</div>

									{/* Testimonial Content - Smaller Text */}
									<blockquote 
										className="text-lg sm:text-xl lg:text-2xl font-light text-indigo-100 italic 
													transition-all duration-1000 ease-in-out transform scale-100 opacity-100 leading-relaxed"
									>
										"{currentTestimonial.content}"
									</blockquote>

									{/* Rating - Smaller */}
									<div className="mt-8 flex justify-center items-center space-x-1">
										{renderStars(currentTestimonial.rating)}
									</div>

									{/* Client Info */}
									<div className="mt-6">
										<div className="flex items-center justify-center">
											<div className="flex-shrink-0">
												<AvatarInitials name={currentTestimonial.name} />
											</div>
											<div className="ml-3 text-left">
												<div className="text-lg font-bold text-sky-300">
													{currentTestimonial.name}
												</div>
												<div className="text-purple-400 text-sm">
													{currentTestimonial.position}
												</div>
												<div className="text-xs text-indigo-300">
													{currentTestimonial.company}
												</div>
											</div>
										</div>
									</div>

									{/* Project Info - Smaller */}
									<div className="mt-4">
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
																	bg-purple-900/50 text-sky-300 border border-sky-400/30 shadow-md shadow-purple-500/10">
											Project: {currentTestimonial.project}
										</span>
									</div>
								</div>
							</div>

							{/* Dots Indicator - Smaller */}
							<div className="mt-8 flex justify-center space-x-2">
								{testimonials.map((_, index) => (
									<button
										key={index}
										onClick={() => goToTestimonial(index)}
										className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
											index === activeTestimonial
												? 'bg-gradient-to-r from-sky-400 to-purple-500 w-6 h-2 shadow-md shadow-sky-500/50'
												: 'bg-indigo-700 hover:bg-indigo-600'
										}`}
										aria-label={`Go to testimonial ${index + 1}`}
									/>
								))}
							</div>
						</>
					)}
				</div>

				{/* Additional Testimonials Grid - Made Smaller */}
				<div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{isLoading ? (
						// Show skeleton grid while loading
						[...Array(3)].map((_, index) => (
							<GridTestimonialSkeleton key={index} />
						))
					) : (
						// Show actual testimonials when loaded
						testimonials.slice(0, 3).map((testimonial) => (
							<div
								key={testimonial.id}
								className="bg-indigo-900/40 rounded-lg shadow-lg shadow-purple-900/50 p-5 
												hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 
												border border-indigo-700/50 backdrop-blur-sm"
							>
								{/* Rating - Smaller */}
								<div className="flex items-center space-x-1 mb-3">
									{renderStars(testimonial.rating)}
								</div>

								{/* Content - Smaller Text */}
								<blockquote className="text-indigo-200 mb-4 italic text-sm leading-relaxed">
									"{testimonial.content}"
								</blockquote>

								{/* Client Info - Smaller */}
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
											{testimonial.name.split(' ').map(n => n[0]).join('')}
										</div>
									</div>
									<div className="ml-3">
										<div className="font-semibold text-sky-300 text-sm">
											{testimonial.name}
										</div>
										<div className="text-xs text-purple-400">
											{testimonial.position}
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{/* Stats Section - Smaller */}
				{isLoading ? (
					<StatsSkeleton />
				) : (
					<div className="mt-16 bg-gray-800/40 rounded-xl shadow-xl shadow-sky-900/50 p-6 
									text-gray-100 border border-sky-500/30 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-900/0 to-purple-900/20 pointer-events-none"></div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
							<div>
								<div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">98%</div>
								<div className="text-indigo-300 mt-1 text-xs font-medium">Client Satisfaction</div>
							</div>
							<div>
								<div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">50+</div>
								<div className="text-indigo-300 mt-1 text-xs font-medium">Projects Delivered</div>
							</div>
							<div>
								<div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">30+</div>
								<div className="text-indigo-300 mt-1 text-xs font-medium">5-Star Reviews</div>
							</div>
							<div>
								<div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">100%</div>
								<div className="text-indigo-300 mt-1 text-xs font-medium">On-Time Delivery</div>
							</div>
						</div>
					</div>
				)}

				{/* CTA Section - Smaller */}
				
			</div>
			{/* Custom CSS for the Neon Effect and Animations */}
			<style>{`
				@keyframes pulse-slow {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.85; }
				}
				.animate-pulse-slow {
					animation: pulse-slow 5s infinite ease-in-out;
				}
				/* Custom Shadow for the Main Card */
				.shadow-2xl {
					box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 60px rgba(109, 40, 217, 0.3);
				}
				/* Custom CSS required for the glowing gradient border/edge effect */
				.mask-gradient-alpha {
					-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
					mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
					-webkit-mask-composite: xor;
					mask-composite: exclude;
				}
			`}</style>
		</div>
	);
};

export default Testimonial;