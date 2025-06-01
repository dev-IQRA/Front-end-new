import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import "./user-info.css";

const UserInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Generate initial from username or full_name
  const getInitial = () => {
    if (user?.full_name) {
      const names = user.full_name.split(' ');
      if (names.length >= 2) {
        return names[0][0] + names[1][0];
      }
      return names[0][0];
    }
    return user?.username?.[0]?.toUpperCase() || "U";
  };

  const displayName = user?.full_name || user?.username || "User";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      try {
        await axiosInstance.get("/api/auth/logout");
      } catch (error) {
        console.log("Logout request failed:", error);
      }
      
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      
      // Clear user context
      setUser(null);
      
      // Navigate to login
      navigate("/login");
    }
  };

  return (
    <div className={`user-info-overlay ${isExpanded ? "expanded" : ""}`}>
      <div className="user-info-content" onClick={toggleExpand}>
        <div className="user-circle">{getInitial()}</div>
        <div className="user-details">
          <span className="username-label">{displayName}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="user-dropdown">
          <ul>
            <li className="logout" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
