import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "./LoginPage.css"; 

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch("http://localhost:8080/admin/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authHeader", `Basic ${credentials}`);
      localStorage.setItem("username", username);  // Store the username

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid fixed-top vh-100">
      <div className="row h-100">
        {/* Left Section - Animation (Background Color Added) */}
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-4">
          <h2>PORTFOLIO ADMIN LOGIN</h2>
          <Player
            autoplay
            loop
            src="/login.json"
            style={{ height: "300px", width: "300px" }}
          />
        </div>

        {/* Right Section - Login Form (White Background) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-white">
          <div className="card p-4 shadow w-75">
            <h2 className="text-start fs-3">Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-dark">Username:</label>
                <input
                  className="form-control bg-white text-dark"
                  type="text color-dark"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password:</label>
                <input
                  className="form-control bg-white text-dark"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
