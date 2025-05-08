import React, { useState } from "react"; // Import useState
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  // State to manage the visibility of the submenu
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  // Function to toggle the submenu
  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        IQRA<span>Student</span>
      </div>
      <nav className="menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Dashboard
        </NavLink>
        <div className="menu-item" onClick={toggleSubmenu}>
          Academic
        </div>
      </nav>

      {/* Submenu */}
      {isSubmenuOpen && (
        <div className="submenu">
          <NavLink to="/academic/jadwal" className="menu-item">
            Jadwal
          </NavLink>
          <NavLink to="/academic/nilai" className="menu-item">
            Nilai
          </NavLink>
          <NavLink to="/academic/kehadiran" className="menu-item">
            Kehadiran
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
