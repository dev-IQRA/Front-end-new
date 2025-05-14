import React, { useState } from "react";
import "./user-info.css";

const UserInfo = ({ username = "John Doe", profileInitial = "JD" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initial = profileInitial || username.charAt(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`user-info-overlay ${isExpanded ? "expanded" : ""}`}>
      <div className="user-info-content" onClick={toggleExpand}>
        <div className="user-circle">{initial}</div>
        <div className="user-details">
          <span className="username-label">{username}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="user-dropdown">
          <ul>
            <li className="logout">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;