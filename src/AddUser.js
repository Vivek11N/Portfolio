import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function AddUser() {
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");

    const fetchUsers = async () => {
      const basicAuthHeader = localStorage.getItem("authHeader");
      if (!basicAuthHeader) {
        showMessage("Authorization required.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/auth/users", {
          method: "GET",
          headers: { Authorization: basicAuthHeader },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.users || []);
        } else {
          showMessage(data.message || "Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        showMessage("Error fetching users.");
      }
    };

    fetchUsers();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setIsMessageModalOpen(true);
  };

  // 🔹 Username Validation
  const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Only letters and numbers
    if (!value) {
      setUsernameError("Username is required.");
    } else if (!usernameRegex.test(value)) {
      setUsernameError("Username must contain only letters and numbers.");
    } else {
      setUsernameError("");
    }
    validateForm(value, newUser.password);
  };

  // 🔹 Password Validation
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least one letter, one number, and 6+ characters
    if (!value) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(value)) {
      setPasswordError("Password must contain at least one letter and one number, with at least 6 characters.");
    } else {
      setPasswordError("");
    }
    validateForm(newUser.username, value);
  };

  // 🔹 Validate Entire Form
  const validateForm = (username, password) => {
    const isUsernameValid = /^[a-zA-Z0-9]+$/.test(username) && username.length > 0;
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
    setIsFormValid(isUsernameValid && isPasswordValid);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      showMessage("Please fix the validation errors before submitting.");
      return;
    }

    const basicAuthHeader = localStorage.getItem("authHeader");
    if (!basicAuthHeader) {
      showMessage("Authorization required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuthHeader,
        },
        body: JSON.stringify(newUser),
      });

      const responseText = await response.text();
      if (response.ok) {
        showMessage("New user added successfully!");
        setNewUser({ username: "", password: "" });
        setIsModalOpen(false);
      } else {
        showMessage(responseText || "User registration failed.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      showMessage("Failed to add user.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
      <AdminNavbar username={username} />
      <div className="flex-grow-1 d-center text-white p-5 overflow-y-auto">
        <h3>Existing Users</h3>
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary mb-3 justify-content-start" onClick={() => setIsModalOpen(true)}>
            Add New User
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr><th>Username</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="2">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="table-row">
                  <td>{user.username}</td>
                  <td>
                    {user.username !== username ? (
                      <button className="btn btn-danger" onClick={() => showMessage("Delete user function not implemented.")}>
                        <i class="bi-trash">  </i>Delete
                      </button>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        <i class="bi-trash">  </i>  
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Add User Modal */}
        {isModalOpen && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark">Add New User</h5>
                  <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body text-dark">
                  <form onSubmit={handleAddUser}>
                    <div className="mb-3">
                      <label className="form-label text-dark">Username</label>
                      <input type="text" className="form-control" value={newUser.username}
                        onChange={(e) => { setNewUser({ ...newUser, username: e.target.value }); validateUsername(e.target.value); }} required />
                      {usernameError && <small className="text-danger">{usernameError}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-dark">Password</label>
                      <input type="password" className="form-control" value={newUser.password}
                        onChange={(e) => { setNewUser({ ...newUser, password: e.target.value }); validatePassword(e.target.value); }} required />
                      {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Register User</button>
                  </form>
                </div>
              </div>
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

export default AddUser;
