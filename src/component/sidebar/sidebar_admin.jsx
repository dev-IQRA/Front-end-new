"use client"

import { useState, useEffect, useContext } from "react"
import { Home, User, LogOut, Menu, X } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import "./sidebar_admin.css"

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
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
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">IQRAStudent</h1>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className={`sidebar-menu-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}>
              <Link to="/admin/dashboard" className="sidebar-menu-link">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={`sidebar-menu-item ${location.pathname === "/admin/kelolaakun" ? "active" : ""}`}>
              <Link to="/admin/kelolaakun" className="sidebar-menu-link">
                <User size={20} />
                <span>Kelola Akun</span>
              </Link>
            </li>
            {/* Additional menu items can be added here */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar
