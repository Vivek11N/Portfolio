import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS for toggler functionality
import './App.css'; // Custom CSS

import About from './About';
import Projects from './Project';
import Contact from './Contact';
import Home from './Home';
<<<<<<< HEAD
import ProjectDetails from './ProjectDetails';
import LoginPage from './LoginPage'; // Import login page
import AdminPage from './AdminPage'; // Import admin page
import AddUser from './AddUser';
import ManageEducation from './ManageEducation';
import ManageSkills from './ManageSkill'; // Import ManageSkills
import ManageProjects from './ManageProject'; // Import ManageProjects

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', checkAuth); // Listen for changes in local storage

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};
=======
import './App.css';  
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <MainApp />
=======
      <Navbar />
      <div className="content">
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
          
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  // Function to close the navbar on link click
  const closeNavbar = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show'); // Remove 'show' class to close the navbar
    }
  };

  // Conditionally render the navbar only on certain routes
  const renderNavbar = ![
    '/login',
    '/admin/dashboard',
    '/admin/dashboard/adduser',
    '/admin/dashboard/manage-education',
    '/admin/dashboard/manage-skills',  
    '/admin/dashboard/manage-projects'
  ].includes(location.pathname);

  return (
    <div className="app-wrapper">
      {/* Conditionally render the Navbar */}
      {renderNavbar && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
              MY PORTFOLIO
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects" onClick={closeNavbar}>
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes - Protected */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminPage />} />} />
        <Route path="/admin/dashboard/adduser" element={<ProtectedRoute element={<AddUser />} />} />
        <Route path="/admin/dashboard/manage-education" element={<ProtectedRoute element={<ManageEducation />} />} />
        <Route path="/admin/dashboard/manage-skills" element={<ProtectedRoute element={<ManageSkills />} />} />
        <Route path="/admin/dashboard/manage-projects" element={<ProtectedRoute element={<ManageProjects />} />} />
        
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
