import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/Services';
import Portfolio from '../components/Portfolio';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonial';
import Contact from '../components/Contact';
import Footer from '../components/Footer'
const HomePage = ({ user }) => {
  return (
    <div>
      <HeroSection user={user} />
      <ServicesSection />
      <Portfolio />
      <Gallery />
      <Testimonials />
      <Contact/>
      <Footer/>
    </div>
  );
};

export default HomePage;