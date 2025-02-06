import React, { useState, useEffect, useRef } from 'react';
import AboutText from './AboutText';
import Skills from './Skills';
import ResumeButton from './ResumeButton';
import './About.css'; 
import Education from './Education';

function About() {
  const [isVisibleAboutText, setIsVisibleAboutText] = useState(false);
  const [isVisibleSkills, setIsVisibleSkills] = useState(false);
  const [isVisibleResumeButton, setIsVisibleResumeButton] = useState(false);

  
  const aboutTextRef = useRef(null);
  const skillsRef = useRef(null);
  const resumeButtonRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, 
      threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === aboutTextRef.current) {
          setIsVisibleAboutText(entry.isIntersecting);
        } else if (entry.target === skillsRef.current) {
          setIsVisibleSkills(entry.isIntersecting);
        } else if (entry.target === resumeButtonRef.current) {
          setIsVisibleResumeButton(entry.isIntersecting);
        }
      });
    }, observerOptions);

    observer.observe(aboutTextRef.current);
    observer.observe(skillsRef.current);
    observer.observe(resumeButtonRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about-section container mt-5">
      <div
        ref={aboutTextRef}
        className={`fade-content ${isVisibleAboutText ? 'fade-in' : ''}`}
      >
        <AboutText />
        
      </div>

      <div
        ref={resumeButtonRef}
        className={`fade-content ${isVisibleResumeButton ? 'fade-in' : ''}`}
      >
        <ResumeButton />
      </div>
      
        <Education />
     

      <div
        ref={skillsRef}
        className={`fade-content ${isVisibleSkills ? 'fade-in' : ''}`}
      >
        <Skills />
      </div>
    </section>
  );
}

export default About;
