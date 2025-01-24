import React from "react";
import { Player } from "@lottiefiles/react-lottie-player"; 
import "./skills.css";

function Skills() {
  const skills = [
    { name: "React", level: 60, imgSrc: "./1.png" },
    { name: "Node.js", level: 50, imgSrc: "./2.png" },
    { name: "Spring Boot", level: 35, imgSrc: "./3.png" },
    { name: "PostgreSQL", level: 50, imgSrc: "./4.png" },
    { name: "Git", level: 75, imgSrc: "./6.png" },
  ];

  return (
    <section className="skills">
      <h1>Skills</h1>
      <div className="skills-container">
       
        <div className="lottie-section">
          
          <Player
            autoplay
            loop
            src="Animation.json" 
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
