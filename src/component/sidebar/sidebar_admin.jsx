"use client"

import { useState, useEffect } from "react"
import { Home, User, LogOut, Menu, X } from "lucide-react"
import "./sidebar_admin.css"

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

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
            <li className="sidebar-menu-item active">
              <a href="#" className="sidebar-menu-link">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a href="#" className="sidebar-menu-link">
                <User size={20} />
                <span>Kelola Akun</span>
              </a>
            </li>
            {/* Additional menu items can be added here */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout">
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
