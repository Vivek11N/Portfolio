import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);

  
  useEffect(() => {
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

  return (
    <section className="container mt-5">
      <h1 className="text-center mb-4">My Projects</h1>
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {}
              <img
                src={getImageUrl(project.id)} 
                alt={project.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
