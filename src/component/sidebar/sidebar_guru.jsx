import { Link, useLocation } from "react-router-dom"
import { Home, User, LogOut } from "lucide-react"
import "./sidebar_guru.css"

const Sidebar_guru = () => {
  const location = useLocation()

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">IQRATeacher</h1>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className={`sidebar-menu-item ${isActive("/guru/dashboard") ? "active" : ""}`}>
            <Link to="/guru/dashboard">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${isActive("/guru/academic") ? "active" : ""}`}>
            <Link to="/guru/academic">
              <User size={20} />
              <span>Academic</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar_guru
