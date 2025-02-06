import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar

function ManageEducation() {
  const [educationRecords, setEducationRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEducation, setNewEducation] = useState({
    title: "",
    institution: "",
    years: "",
  });
  const [editEducation, setEditEducation] = useState(null);
  const [username, setUsername] = useState(""); // To hold the username from localStorage

  // When the component mounts, fetch education records and check for credentials in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); // Set the username if available

    const fetchEducationRecords = async () => {
      const basicAuthHeader = localStorage.getItem("authHeader");

      if (!basicAuthHeader) {
        setMessage("Authorization required.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/education", {
          method: "GET",
         
        });

        const data = await response.json();

        if (response.ok) {
          setEducationRecords(data || []);
        } else {
          setMessage(data.message || "Failed to fetch education records.");
        }
      } catch (error) {
        console.error("Error fetching education records:", error);
        setMessage("Error fetching education records.");
      }
    };

    fetchEducationRecords();
  }, []);
  const showMessage = (msg) => {
    setMessage(msg);
    setIsMessageModalOpen(true);
  };

  const handleAddOrUpdateEducation = async (e) => {
    e.preventDefault();

    const basicAuthHeader = localStorage.getItem("authHeader");

    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const url = editEducation
        ? `http://localhost:8080/api/education/${editEducation.id}`
        : "http://localhost:8080/api/education";
      const method = editEducation ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuthHeader,
        },
        body: JSON.stringify(newEducation),
      });

      const responseText = await response.text(); 

      if (response.ok) {
        showMessage(editEducation ? "Education record updated!" : "Education record added!");
        
        setNewEducation({ title: "", institution: "", years: "" });
        setEditEducation(null); 
        setIsModalOpen(false); 

        
        const educationResponse = await fetch("http://localhost:8080/api/education", {
          method: "GET",
         
        });

        const educationData = await educationResponse.json();
        if (educationResponse.ok) {
          setEducationRecords(educationData || []);
        } else {
          setMessage(educationData.message || "Failed to fetch updated education records.");
        }
      } else {
        setMessage(responseText || "Failed to add/update education record.");
      }
    } catch (error) {
      console.error("Error occurred during request:", error);
      showMessage("Failed to add/update education record.");
    }
  };

  const handleDeleteEducation = async (educationId) => {
    const basicAuthHeader = localStorage.getItem("authHeader");

    if (!basicAuthHeader) {
      setMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/education/${educationId}`, {
        method: "DELETE",
        headers: {
          Authorization: basicAuthHeader,
        },
      });

      const responseText = await response.text();

      if (response.ok) {
        setMessage("Education record deleted successfully!");
        showMessage("Education deleted successfully");
        // Fetch updated education records list
        const educationResponse = await fetch("http://localhost:8080/api/education", {
          method: "GET",
          
        });

        const educationData = await educationResponse.json();
        if (educationResponse.ok) {
          setEducationRecords(educationData || []);
        } else {
          setMessage(educationData.message || "Failed to fetch updated education records.");
        }
      } else {
        setMessage(responseText || "Failed to delete education record.");
      }
    } catch (error) {
      console.error("Error occurred during request:", error);
      setMessage("Error deleting education record.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
      {/* Sidebar */}
      <AdminNavbar username={username} />

      {/* Main Content */}
      <div className="flex-grow-1 d-center text-white p-5 overflow-y-auto">
        <h3>Manage Education Records</h3>
        

        {/* Add Education Button */}
        <button
          className="btn btn-primary mb-3"
          onClick={() => setIsModalOpen(true)}
        >
          Add Education Record
        </button>

        {/* Education Records as Cards */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {educationRecords.length === 0 ? (
            <p>No education records found.</p>
          ) : (
            educationRecords.map((education) => (
              <div
                className="col mb-4"
                key={education.id}
              >
                <div
                  className="card text-white bg-dark d-flex h-100"
                  style={{ minHeight: "18rem" }} // Ensures all cards are the same height
                >
                  <div className="card-header">
                    <h5 className="card-title">{education.title}</h5>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <p className="card-text">Institution: {education.institution}</p>
                    <p className="card-text">Year: {education.years}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setEditEducation(education);
                          setNewEducation({
                            title: education.title,
                            institution: education.institution,
                            years: education.years,
                          });
                          setIsModalOpen(true);
                          
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEducation(education.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for Add/Edit Education */}
        {isModalOpen && (
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-sm w-100">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark" id="exampleModalLabel">
                    {editEducation ? "Edit Education Record" : "Add Education Record"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-dark">
                  <form onSubmit={handleAddOrUpdateEducation}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label text-dark">
                        Degree Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={newEducation.title}
                        onChange={(e) =>
                          setNewEducation({ ...newEducation, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="institution" className="form-label text-dark">
                        Institution
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="institution"
                        value={newEducation.institution}
                        onChange={(e) =>
                          setNewEducation({ ...newEducation, institution: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="years" className="form-label text-dark">
                        Year
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="years"
                        value={newEducation.years}
                        onChange={(e) =>
                          setNewEducation({ ...newEducation, years: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      {editEducation ? "Update Record" : "Add Record"}
                    </button>
                  </form>
                </div>
              </div>a
            </div>
          </div>
        )}
        {/* Message Modal */}
        {isMessageModalOpen && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark">Message</h5>
                  <button className="btn-close" onClick={() => setIsMessageModalOpen(false)}></button>
                </div>
                <div className="modal-body text-dark">{message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEducation;
