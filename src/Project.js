import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Project.css'; // Import the CSS file

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // To store the details of the selected project

  useEffect(() => {
    // Fetch the list of projects
    axios
      .get('http://localhost:8080/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const getImageUrl = (projectId) => {
    return `http://localhost:8080/api/projects/${projectId}/image`;
  };

  const getProjectDetails = (projectId) => {
    // Fetch the details of the selected project
    axios
      .get(`http://localhost:8080/api/projects/${projectId}`)
      .then((response) => {
        setSelectedProject(response.data); // Store the project details in state
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });
  };

  return (
    <section className="container mt-5">
      <h1 className="text-center mb-4">My Projects</h1>
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4 mb-4">
            <div className="card h-100 project-card">
              <img
                src={getImageUrl(project.id)}
                alt={project.title}
                className="card-img-top project-image"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => getProjectDetails(project.id)} // Call to get project details
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal or section to display project details when clicked */}
      {selectedProject && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProject.title}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => setSelectedProject(null)} // Close modal
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="project-details">
                  <img
                    src={getImageUrl(selectedProject.id)}
                    alt={selectedProject.title}
                    className="img-fluid mb-4"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                  <h1>{selectedProject.title}</h1>
                  <p>{selectedProject.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
