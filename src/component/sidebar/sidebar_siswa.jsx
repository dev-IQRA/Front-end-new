"use client"

import { useState, useEffect } from "react"
import { Home, BookOpen, Calendar, FileText, Menu, X } from "lucide-react"
import "./sidebar_siswa.css"

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 1024
      setIsMobile(isMobileView)

      if (isMobileView) {
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
                <BookOpen size={20} />
                <span>Academic</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a href="#" className="sidebar-menu-link">
                <Calendar size={20} />
                <span>Jadwal</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a href="#" className="sidebar-menu-link">
                <FileText size={20} />
                <span>Nilai</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar
