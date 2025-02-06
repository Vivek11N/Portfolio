<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
=======
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player"; 
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
import "./skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const fallbackImage = "fallback.png"; // Replace with a valid fallback image URL

  useEffect(() => {
    // Fetch skills from the backend
    fetch("http://localhost:8080/api/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  return (
    <section className="skills">
<<<<<<< HEAD
      <h1 className="skills-heading">Skills</h1>
      
      <div className="skills-container">
        <div className="lottie-section">
          <Player
            autoplay
            loop
            src="Animation.json"
=======
      <h1>Skills</h1>
      <div className="skills-container">
       
        <div className="lottie-section">
          
          <Player
            autoplay
            loop
            src="Animation.json" 
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
            style={{ height: "100%", width: "100%" }}
          />
        </div>

<<<<<<< HEAD
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.id}>
              <img
                src={`http://localhost:8080/api/skills/${skill.id}/image`}
                alt={skill.title}
                className="skill-img"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = fallbackImage;
                }}
              />
              <h3 className="skill-name">{skill.title}</h3>
=======
        
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.name}>
              <img src={skill.imgSrc} alt={skill.name} className="skill-img" />
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-level">
                <div
                  className="level-bar"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;