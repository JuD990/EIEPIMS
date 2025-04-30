import React from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@services/apiServices";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiService.delete("/logout");

            // Clear local storage
            localStorage.removeItem("authToken");
            localStorage.removeItem("employee_id");
            localStorage.removeItem("userType");

            // Redirect to the login page
            navigate("/");
        } catch (error) {
            console.error("Logout failed: ", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <button onClick={handleLogout}>
        <p>Logout</p>
        </button>
    );
};

export default LogoutButton;
