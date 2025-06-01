import { Link, useLocation } from "react-router-dom"
import { Home, User, LogOut } from "lucide-react"
import "./sidebar_guru.css"
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Sidebar_guru = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path
  }
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
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar_guru
