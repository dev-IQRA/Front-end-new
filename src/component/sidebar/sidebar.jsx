import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
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
        <NavLink
          to="/academic"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Academic
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
