import React, { useState, useEffect, useRef } from "react";
import "./User-info.css";
import userinfo from "@assets/user-user.png";
import apiService from "@services/apiServices";
import { useNavigate } from "react-router-dom";
import LogoutButton from "@logout/Logout"; // Import the LogoutButton component

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token not found.");

        const response = await apiService.get("/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          setError(err.response?.data?.message || "Failed to fetch user info.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); // Adjust the route based on your app
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
    className="user-info"
    ref={dropdownRef}
    onClick={() => setDropdownOpen((prev) => !prev)} // Attach the handler here
    >
    <div className="user-icon">
    <img src={userinfo} alt="User Icon" />
    </div>
    <div className="user-details">
    <h2 className="user-name">{user.name}</h2>
    <p className="user-role">{user.role}</p>
    </div>
    {dropdownOpen && (
      <div className="user-info-dropdown-menu">
      <button onClick={handleProfileClick} className="user-info-dropdown-item">
      Profile
      </button>
      <div className="user-info-dropdown-item">
      <LogoutButton /> {/* Use the LogoutButton component here */}
      </div>
      </div>
    )}
    </div>
  );
};

export default UserInfo;
