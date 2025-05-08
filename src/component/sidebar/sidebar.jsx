import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

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
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/academic"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          Academic
        </NavLink>
      </nav>

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
    </aside>
  );
};

export default Sidebar;
