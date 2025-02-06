import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
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
      <h1 className="skills-heading">Skills</h1>
      
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;