import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";

function ManageAboutMeImage() {
  const [aboutme, setAboutme] = useState(null);  // Assuming only one AboutMe entry for simplicity
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
    fetchAboutMe(); // Fetch about me data to show the current image
  }, []);

  const fetchAboutMe = async () => {
    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/aboutme", {
        method: "GET",
        headers: { Authorization: basicAuthHeader },
      });
      const data = await response.json();
      if (response.ok) {
        setAboutme(data[0]);  // Assuming only one entry for simplicity
      } else {
        setMessage(data.message || "Failed to fetch About Me data.");
      }
    } catch (error) {
      console.error("Error fetching About Me data:", error);
      setMessage("Error fetching About Me data.");
    }
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newImage) {
      formData.append("image", newImage);
    }

    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/aboutme/${aboutme.id}`, {
        method: "PUT",
        body: formData,
        headers: { Authorization: basicAuthHeader },
      });

      if (response.ok) {
        setMessage("Image updated successfully!");
        setNewImage(null);
        fetchAboutMe();
        setIsModalOpen(false);
      } else {
        setMessage("Error updating image.");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      setMessage("Error updating image.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
      <AdminNavbar username={username} />
      <div className="flex-grow-1 text-white p-5 overflow-y-auto">
        <h3>Manage About Me Image</h3>
        {message && <div className="alert alert-info">{message}</div>}
        {aboutme && (
          <div>
            <h5>Current Image</h5>
            <img
              src={`http://localhost:8080/api/aboutme/${aboutme.id}/image`}
              alt="Current About Me"
              style={{ width: "100%", height: "auto" }}
            />
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Change Image
            </Button>
          </div>
        )}
      </div>

      {/* Change Image Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change About Me Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveImage}>
            <Form.Group className="mb-3">
              <Form.Label>New Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewImage(e.target.files[0])} required />
            </Form.Group>
            <Button variant="primary" type="submit">Save Image</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ManageAboutMeImage;
