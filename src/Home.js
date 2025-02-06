import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Home.css";

function Home() {
  const rotatingTexts = ["SOFTWARE DEVELOPER", "WANDERLUST", "GAMER"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

 
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 1500; i++) {
      const topOffset = `${Math.random() * 100}vh`;
      const leftOffset = `${Math.random() * 100}vw`;
      const size = Math.random(); 
      const speed = Math.random(); 

      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: topOffset,
            left: leftOffset,
            "--size": size,
            "--speed": speed,
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="home-page">
     
      <div className="stars">{generateStars()}</div>

      
      <div className="avatar-container">
        <Player
          autoplay
          loop
          src="Animation3.json"
          style={{ height: "150px", width: "150px" }}
          className="avatar"
        />
      </div>

      
      <h1>Hi, I am Vivek Narayanan</h1>
      <p className="rotating-text">{rotatingTexts[currentTextIndex]}</p>

      
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
