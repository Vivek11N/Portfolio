import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/smooch-sans"; // Ensure this font package is installed
import "./ProjectDetails.css"; // Import the CSS file for styling

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  // Fetch project details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/projects/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        setError(true);
      });
  }, [projectId]);

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h1 className="error-title">Error</h1>
        <p className="error-message">
          Unable to fetch project details. Please try again later.
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="container project-details-container mt-5">
      <h1 className="text-center project-title">{project.title}</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Project Image */}
          <div className="image-wrapper">
            <img
              src={`http://localhost:8080/api/projects/${project.id}/image`}
              alt={project.title}
              className="project-image"
            />
          </div>
          {/* Project Description */}
          <p className="project-description">{project.description}</p>
          <p className="project-details">
            <strong>Details:</strong> {project.details}
          </p>
        </div>
      </div>
      {/* Back to Projects Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/projects")}
          className="btn btn-primary"
        >
          Back to Projects
        </button>
      </div>
    </section>
  );
}

export default ProjectDetails;
