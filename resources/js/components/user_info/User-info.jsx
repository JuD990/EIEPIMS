import React, { useState, useEffect, useRef } from "react";
import "./User-info.css";
import userinfo from "@assets/user-user.png";
import apiService from "@services/apiServices";
import { useNavigate } from "react-router-dom";
import LogoutButton from "@logout/Logout";
import logoutIcon from "@assets/logout_icon.png";
import profileIcon from "@assets/profile.png";

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
    navigate("#"); // Adjust the route
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
    className="user-info"
    ref={dropdownRef}
    onClick={() => setDropdownOpen((prev) => !prev)}
    >
    <div className="user-icon">
    <img src={userinfo} alt="User Icon" />
    </div>
    <div className="user-details">
    <h2 className="user-name">{user.name}</h2>
    <p className="user-role">
    {[user.department, user.role, user.year_level]
      .filter(Boolean)
      .join(' ')
      .toUpperCase()}
      </p>

    </div>
    {dropdownOpen && (
      <div className="user-info-dropdown-menu">
      <button onClick={handleProfileClick} className="user-info-dropdown-item">
      <img src={profileIcon} alt="Profile Icon" className="profile-dropdown-icon" />
      Profile
      </button>
      <div className="logout-user-info-dropdown-item">
      <img src={logoutIcon} alt="Logout Icon" className="dropdown-icon" />
      <LogoutButton />
      </div>
      </div>
    )}
    </div>
  );
};

export default UserInfo;
