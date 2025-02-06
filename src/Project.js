import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const fallbackImage = "/fallback.jpeg"; // Path to fallback image

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const getImageUrl = (projectId) => {
    return `http://localhost:8080/api/projects/${projectId}/image`;
  };

  return (
    <section className="container mt-5">
      <h1 className="text-center mb-4">PROJECTS</h1>
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0 interactive-card position-relative">
              <img
                src={getImageUrl(project.id)}
                alt={project.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => (e.target.src = fallbackImage)} // Handle image errors
              />
              <div className="card-body">
                <h5 className="card-title text-center text-black">{project.title}</h5>
              </div>
              <div className="description-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center p-3">
                <p className="card-text">{project.description}</p>
              </div>
              <Link to={`/projects/${project.id}`} className="stretched-link" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
