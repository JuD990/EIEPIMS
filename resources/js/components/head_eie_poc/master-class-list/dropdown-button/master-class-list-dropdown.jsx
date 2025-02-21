import React, { useState } from "react";
import "./master-class-list-dropdown.css";

const MasterClassListDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="eie-head-dropdown-container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
    {/* Right side Search Area */}
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    style={{
      width: '476px',
      height: '60px',
      borderRadius: '8px',
      borderColor: '#333333',
      paddingLeft: '10px',
      fontSize: '16px',
      marginRight: '385px',
    }}
    />
    </div>
  );
};

export default MasterClassListDropdown;
