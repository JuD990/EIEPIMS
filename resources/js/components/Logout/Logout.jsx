import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@services/apiServices";

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await apiService.delete("/logout");

            // Clear all relevant localStorage data
            localStorage.removeItem("authToken");
            localStorage.removeItem("employee_id");
            localStorage.removeItem("student_id");
            localStorage.removeItem("userRole");

            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to log out. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleLogout}>
        <p>Logout</p>
        </button>
    );
};

export default LogoutButton;
