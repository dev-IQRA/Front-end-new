import React, { useState, useEffect } from "react"; // Import useState
import { NavLink, useLocation } from "react-router-dom";
import "./sidebar_siswa.css";

const Sidebar = () => {
   const location = useLocation();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

useEffect(() => {
    if (location.pathname.startsWith("/siswa/academic")) {
      setSubmenuOpen(true);
    }
  }, [location]);

  // Function to toggle the submenu
  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar Navigation">
      <div className="brand">
        IQRA<span>Student</span>
      </div>
      <nav className="menu">
        <NavLink
          to="/siswa/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Dashboard
        </NavLink>
        <div 
          className={`menu-item ${isSubmenuOpen ? "active" : ""}`}
          onClick={toggleSubmenu}
        >
          Academic
        </div>
      </nav>

      {isSubmenuOpen && (
        <div className="submenu">
          <NavLink to="/siswa/academic/jadwal" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
          >
            Jadwal
          </NavLink>
          <NavLink to="/siswa/academic/nilai" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>

            Nilai
          </NavLink>
          <NavLink to="/siswa/academic/kehadiran" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            Kehadiran
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
