import React from 'react';
import "./User-info.css"
import userinfo from "@assets/user-user.png";

const UserInfo = () => {
  return (
    <div className="user-info">
    <div className="user-icon">
      <img src={userinfo} alt="User Icon" />
    </div>
    <div className="user-details">
      <h2 className="user-name">Agnes Reyes</h2>
      <p className="user-role">EIE Head</p>
    </div>
  </div>
  );
};

export default UserInfo;
