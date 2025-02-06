import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Card, Row, Col, Form } from "react-bootstrap";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", details: "", image: null });
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // For showing project details in a modal
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // State for error popup
  const [errorPopup, setErrorPopup] = useState({ show: false, text: "" });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
    fetchProjects();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setIsMessageModalOpen(true);
  };

  const fetchProjects = async () => {
    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "GET",
        
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      } else {
        setMessage(data.message || "Failed to fetch projects.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage("Error fetching projects.");
    }
  };

  // Helper function to show error popup
  const showError = (errorText) => {
    setErrorPopup({ show: true, text: errorText });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();

    // If adding a new project, ensure that an image is provided.
    if (!isEditing && !newProject.image) {
      showError("Project image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("details", newProject.details);
    // Append image only if one is provided.
    if (newProject.image) {
      formData.append("image", newProject.image);
    }

    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showError("Authorization required.");
      return;
    }

    try {
      const url = isEditing 
        ? `http://localhost:8080/api/projects/${selectedProject.id}` 
        : "http://localhost:8080/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: basicAuthHeader },
      });

      if (response.ok) {
        showMessage(isEditing ? "Project updated successfully!" : "Project added successfully!")
        setMessage(isEditing ? "Project updated successfully!" : "Project added successfully!");
        setNewProject({ title: "", description: "", details: "", image: null });
        setIsEditing(false);
        fetchProjects();
        setIsModalOpen(false);
      } else {
        setMessage("Error saving project.");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage("Error saving project.");
    }
  };

  const handleDeleteProject = async (id) => {
    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: basicAuthHeader },
      });

      if (response.ok) {
        showMessage("Project deleted successfully!");
        fetchProjects();
      } else {
        setMessage("Error deleting project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage("Error deleting project.");
    }
  };

  const handleShowDetails = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
      <AdminNavbar username={username} />
      <div className="flex-grow-1 text-white p-5 overflow-y-auto">
        <h3>Manage Projects</h3>
        
        <Button variant="primary text-left" onClick={() => { 
          setIsEditing(false); 
          setNewProject({ title: "", description: "", details: "", image: null });
          setIsModalOpen(true); 
        }}>
          Add New Project
        </Button>
        <Row className="mt-4">
          {projects.map((project) => (
            <Col xs={12} sm={6} md={4} lg={3} key={project.id} className="mb-4">
              <Card 
                className="h-100 text-dark flex-column" 
                onClick={() => handleShowDetails(project)} 
                style={{ cursor: 'pointer' }} 
              >
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:8080/api/projects/${project.id}/image`} 
                  style={{ height: "150px", objectFit: "cover" }} 
                />
                <Card.Body className="d-flex flex-column text-dark justify-content-between p-2">
                  <Card.Title className="text-center text-dark" style={{ fontSize: "1rem" }}>
                    {project.title}
                  </Card.Title>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setSelectedProject(project); 
                        setNewProject({ 
                          title: project.title, 
                          description: project.description, 
                          details: project.details, 
                          image: null  // For edit, image remains null unless updated
                        }); 
                        setIsEditing(true); 
                        setIsModalOpen(true); 
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleDeleteProject(project.id); 
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Add/Edit Project Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Project" : "Add New Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveProject}>
            <Form.Group className="mb-3 ">
              <Form.Label className="text-dark">Project Title</Form.Label>
              <Form.Control 
                type="text" 
                value={newProject.title} 
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} 
                required 
              />
               
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Project Description</Form.Label>
              <Form.Control 
                as="textarea" 
                value={newProject.description} 
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Project Details</Form.Label>
              <Form.Control 
                as="textarea" 
                value={newProject.details} 
                onChange={(e) => setNewProject({ ...newProject, details: e.target.value })} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Project Image</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })} 
                
                required={!isEditing} 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? "Update Project" : "Save Project"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Project Details Modal */}
      <Modal show={isDetailModalOpen} onHide={() => setIsDetailModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description</h5>
          <p>{selectedProject?.description}</p>
          <h5>Details</h5>
          <p>{selectedProject?.details}</p>
          {selectedProject?.image && (
            <img
              src={`http://localhost:8080/api/projects/${selectedProject.id}/image`}
              alt="Project"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isMessageModalOpen && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark">Message</h5>
                  <button className="btn-close" onClick={() => setIsMessageModalOpen(false)}></button>

                </div>
                <div className="modal-body text-dark">{message}
                  <button className="btn-ok type-submit text-left" onClick={() => setIsMessageModalOpen(false)}>ok</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ManageProjects;
