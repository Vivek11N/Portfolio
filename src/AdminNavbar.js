import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap icons

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "Guest");
  }, []);

  const handleLogout = async () => {
    const authHeader = localStorage.getItem("authHeader");

    if (!authHeader) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: { Authorization: authHeader },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authHeader");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        // Handle error if necessary
      }
    } catch (error) {
      alert("An error occurred during logout.");
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "bi-house-door" },
    { name: "Admin", path: "/admin/dashboard/adduser", icon: "bi-person" },
    { name: "Education", path: "/admin/dashboard/manage-education", icon: "bi-book" },
    { name: "Skills", path: "/admin/dashboard/manage-skills", icon: "bi-laptop" },
    { name: "Projects", path: "/admin/dashboard/manage-projects", icon: "bi-file-earmark" },
  ];

  return (
    <div className="bg-dark text-white p-3 d-flex flex-column col-lg-2 col-md-3 col-sm-5 col-xs-5">
      <h3>Admin Panel</h3>
      <p>Logged in as: <strong>{username}</strong></p>

      {navItems.map((item) => (
        <div
          key={item.path}
          className={`mb-2 p-2 nav-item ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <i className={`bi ${item.icon} me-2`}></i>
          {item.name}
        </div>
      ))}

      {/* Logout button */}
      <div
        className="p-2 rounded mt-auto logout-button"
        onClick={() => setShowLogoutModal(true)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
          borderTop: "2px solid red",
          paddingTop: "10px",
          backgroundColor: "red",
          color: "white",
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i>Logout
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          .nav-item {
            cursor: pointer;
            transition: background 0.3s ease-in-out;
          }
          .nav-item:hover {
            background: rgba(149, 142, 214, 0.2);
          }
          .nav-item.active {
            background: rgba(255, 255, 255, 0.3);
            font-weight: bold;
          }
          .logout-button:hover {
            background-color: darkred;
            color: white;
          }
        `}
      </style>
    </div>
  );
}

export default AdminNavbar;
