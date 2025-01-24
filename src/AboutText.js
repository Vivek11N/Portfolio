import React from 'react';
import './AboutText.css'; 

function AboutText() {
  return (
    <section className="about-container">
      <div className="about-text-container">
        <h1 className="about-heading">About Me</h1>
        <p className="about-text">
          Hello, I'm Vivek, a passionate developer with a love for building amazing projects. With a background in software development, I specialize in creating scalable and efficient applications using modern technologies like React, Node.js, and Spring Boot. I have a keen interest in problem-solving and continuously learning new technologies to stay up-to-date with the latest industry trends. Whether it's designing a seamless user experience or optimizing backend performance, I strive for excellence in every project I take on. In addition to my technical skills, I believe in the power of collaboration and enjoy working with cross-functional teams to bring ideas to life.
        </p>
      </div>
      <div className="about-image-container">
        <img
          src="./portfolio-bg.png" 
          alt="Vivek portrait"
          className="about-image"
        />
      </div>
    </section>
  );
}

export default AboutText;
