import React from 'react';
import AboutText from './AboutText';

import Skills from './Skills';

import ResumeButton from './ResumeButton';
import './About.css'; 

function About() {
  return (
    <section className="container mt-5">
      <AboutText />
      <ResumeButton />
      <Skills />
      
      
    </section>
    
  );
}

export default About;
