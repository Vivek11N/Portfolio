import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
<<<<<<< HEAD
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

=======
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
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
      stars.push(
        <div
          key={i}
          className="star"
<<<<<<< HEAD
          style={{
            top: topOffset,
            left: leftOffset,
            "--size": size,
            "--speed": speed,
          }}
=======
          style={{ top: topOffset, left: leftOffset }}
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="home-page">
<<<<<<< HEAD
     
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

      
=======
      
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
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
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
