import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";

function AdminPage() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const authHeader = localStorage.getItem("authHeader");
        const storedUsername = localStorage.getItem("username");

        if (!authHeader) {
            navigate("/login");
            return;
        }

        if (storedUsername) setUsername(storedUsername);

        fetch("http://localhost:8080/admin/dashboard", {
            method: "GET",
            headers: { Authorization: authHeader },
        })
            .then((res) => res.json().catch(() => ({}))) // Prevent JSON parse error
            .then((data) => setMessage(data.message || "Welcome Admin!"))
            .catch(() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("authHeader");
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div className="d-flex vh-100 bg-black fixed-top navbar-scroll">
            <AdminNavbar username={username} />
            <div className="flex-grow-1 d-center text-white p-5 overflow-y-auto">
                <h2>Admin Dashboard</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default AdminPage;