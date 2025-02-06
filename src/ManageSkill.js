import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Card, Row, Col } from "react-bootstrap";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ title: "", image: null });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [message, setMessage] = useState(""); // For success/info messages
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(""); // To hold the username from localStorage
   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  // State for error popup
  const [errorPopup, setErrorPopup] = useState({ show: false, text: "" });

  // When the component mounts, fetch all skills and check for credentials in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); // Set the username if available
    fetchSkills();
  }, []);


  const showMessage = (msg) => {
    setMessage(msg);
    setIsMessageModalOpen(true);
  };

  const fetchSkills = async () => {
    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showError("Authorization required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/skills", {
        method: "GET",
       
      });
      const data = await response.json();
      if (response.ok) {
        setSkills(data);
      } else {
        showError(data.message || "Failed to fetch skills.");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      showError("Error fetching skills.");
    }
  };

  // Helper function to show error popup
  const showError = (errorText) => {
    setErrorPopup({ show: true, text: errorText });
  };

  // Validation for adding a new skill
  const validateAddSkill = () => {
    if (!newSkill.title.trim()) {
      showError("Title is required.");
      return false;
    }
    if (!newSkill.image) {
      showError("Image is required.");
      return false;
    }
    return true;
  };

  // Validation for updating a skill
  // (In update mode, title is required.
  //  The image field is optional if you don't want to change it.)
  const validateUpdateSkill = () => {
    if (!selectedSkill.title.trim()) {
      showError("Title is required.");
      return false;
    }
    return true;
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();

    // Validate before sending the request
    if (!validateAddSkill()) return;

    const formData = new FormData();
    formData.append("title", newSkill.title);
    formData.append("image", newSkill.image);

    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showError("Authorization required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/skills", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: basicAuthHeader,
        },
      });

      if (response.ok) {
        showMessage("Skill added successfully!");
        setNewSkill({ title: "", image: null });
        fetchSkills();
        setIsModalOpen(false);
      } else {
        showError("Error adding skill.");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      showError("Error adding skill.");
    }
  };

  const handleDeleteSkill = async (id) => {
    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showError("Authorization required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: basicAuthHeader,
        },
      });

      if (response.ok) {
        showMessage("Skill deleted successfully!");
        fetchSkills();
      } else {
        showError("Error deleting skill.");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      showError("Error deleting skill.");
    }
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();

    // Validate before sending the update request
    if (!validateUpdateSkill()) return;

    const formData = new FormData();
    formData.append("title", selectedSkill.title);

    // Only append image if a new one has been selected.
    // If not, the server can keep the current image.
    if (selectedSkill.image instanceof File) {
      formData.append("image", selectedSkill.image);
    }

    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showError("Authorization required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/skills/${selectedSkill.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: basicAuthHeader,
        },
      });

      if (response.ok) {
        showMessage("Skill updated successfully!");
        setIsModalOpen(false);
        fetchSkills();
      } else {
        showError("Error updating skill.");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      showError("Error updating skill.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
      {/* Sidebar */}
      <AdminNavbar username={username} />

      {/* Main Content */}
      <div className="flex-grow-1 d-center text-white p-5 overflow-y-auto">
        <h3>Manage Skills</h3>
        {message && <div className="alert alert-info">{message}</div>}

        {/* Add Skill Button */}
        <Button variant="primary" onClick={() => { 
          setIsEditing(false); 
          setNewSkill({ title: "", image: null }); 
          setIsModalOpen(true); 
        }}>
          Add New Skill
        </Button>

        {/* Skills Cards */}
        <Row className="mt-4">
          {skills.map((skill) => (
            <Col xs={12} sm={6} md={4} lg={3} key={skill.id} className="mb-4">
              <Card style={{ width: '100%' }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080/api/skills/${skill.id}/image`}
                  alt="Skill Image"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body style={{ padding: '0.75rem' }}>
                  <Card.Title style={{ fontSize: '1rem' }}>{skill.title}</Card.Title>
                  <Button variant="warning" onClick={() => { 
                    setSelectedSkill(skill); 
                    setIsEditing(true); 
                    setIsModalOpen(true); 
                  }} size="sm">
                    Edit
                  </Button>
                  <Button variant="danger " onClick={() => handleDeleteSkill(skill.id)} className="ms-2 " size="sm">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for Adding or Updating Skill */}
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Update Skill" : "Add Skill"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={isEditing ? handleUpdateSkill : handleAddSkill}>
              <div className="mb-3">
                <label className="form-label text-dark">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={isEditing ? selectedSkill?.title : newSkill.title}
                  onChange={(e) => {
                    if (isEditing) {
                      setSelectedSkill({ ...selectedSkill, title: e.target.value });
                    } else {
                      setNewSkill({ ...newSkill, title: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    if (isEditing) {
                      setSelectedSkill({ ...selectedSkill, image: e.target.files[0] });
                    } else {
                      setNewSkill({ ...newSkill, image: e.target.files[0] });
                    }
                  }}
                  accept="image/*"
                  required={!isEditing}
                />
              </div>
              <Button type="submit" variant="primary">
                {isEditing ? "Update Skill" : "Add Skill"}
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Error Popup Modal */}
        <Modal show={errorPopup.show} onHide={() => setErrorPopup({ show: false, text: "" })}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorPopup.text}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorPopup({ show: false, text: "" })}>
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
    </div>
  );
}

export default ManageSkills;
