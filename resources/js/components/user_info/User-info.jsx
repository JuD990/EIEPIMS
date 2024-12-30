import React, { useState, useEffect } from 'react';
import "./User-info.css";
import userinfo from "@assets/user-user.png";
import apiService from '@services/apiServices';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
          // Clear token and redirect to login page
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-info">
    <div className="user-icon">
    <img src={userinfo} alt="User Icon" />
    </div>
    <div className="user-details">
    <h2 className="user-name">{user.name}</h2>
    <p className="user-role">{user.role}</p>
    </div>
    </div>
  );
};

export default UserInfo;
