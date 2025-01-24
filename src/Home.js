import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player"; 
import "./Home.css";

function Home() {
  const rotatingTexts = ["Software Developer", "Travel Enthusiast", "Gamer"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, );

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 800; i++) {
      const topOffset = `${Math.random() * 100}vh`;
      const leftOffset = `${Math.random() * 100}vw`;
      stars.push(
        <div
          key={i}
          className="star"
          style={{ top: topOffset, left: leftOffset }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="home-page">
      
      <div className="stars">{generateStars()}</div>

      
      

      <Player
  autoplay
  loop
  src="Animation3.json" 
  style={{ height: "200px", width: "300px" }} 
  className="avatar"
/>

      {}
      <h1 className="main-heading">Hi, I am Vivek Narayanan</h1>

      {}
      <p className="rotating-text">{rotatingTexts[currentTextIndex]}</p>

      {}
      <div className="social-icons">
        <a
          href="https://www.instagram.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram size={35} />
        </a>
        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedin size={35} />
        </a>
        <a
          href="https://github.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaGithub size={35} />
        </a>
      </div>
    </div>
  );
}

export default Home;
