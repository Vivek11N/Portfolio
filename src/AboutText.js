import React, { useEffect, useState } from 'react';
import './AboutText.css'; 

function AboutText() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const checkVisibility = () => {
    const section = document.querySelector('.about-container');
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/aboutme/1/image') 
      .then(response => response.blob())
      .then(blob => {
        setImageSrc(URL.createObjectURL(blob));
      })
      .catch(error => console.error('Error fetching about me image:', error));
  }, []);

  return (
    <section className={`about-container ${isVisible ? 'visible' : ''}`}>
      <div className="about-text-container">
        <h1 className="about-heading">About Me</h1>
        <p className="about-text">
          Hello, I'm Vivek, a passionate developer with a love for building amazing projects. With a background in software development, I specialize in creating scalable and efficient applications using modern technologies like React, Node.js, and Spring Boot. I have a keen interest in problem-solving and continuously learning new technologies to stay up-to-date with the latest industry trends. Whether it's designing a seamless user experience or optimizing backend performance, I strive for excellence in every project I take on. In addition to my technical skills, I believe in the power of collaboration and enjoy working with cross-functional teams to bring ideas to life.
        </p>
      </div>
      <div className="about-image-container">
        {imageSrc ? (
          <img src={imageSrc} alt="Vivek portrait" className="about-image" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </section>
  );
}

export default AboutText;
