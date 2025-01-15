import React from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../../services/apiServices";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call the logout API
            await apiService.post('/logout');

            // Clear local storage
            localStorage.removeItem("authToken");
            localStorage.removeItem("employee_id");
            localStorage.removeItem("userType");

            // Redirect to the login page
            navigate("/login");
        } catch (error) {
            console.error("Logout failed: ", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
        Logout
        </button>
    );
};

export default LogoutButton;
