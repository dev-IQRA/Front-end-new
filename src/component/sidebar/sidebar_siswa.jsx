import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Home, BookOpen, Calendar, FileText, ClipboardCheck, ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import "./sidebar_siswa.css"

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState({
    academic: true // Set academic menu to be expanded by default
  })

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

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }))
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
            <li className="sidebar-menu-item">
              <NavLink 
                to="/siswa/dashboard" 
                className={({ isActive }) => `sidebar-menu-link ${isActive ? "active" : ""}`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            
            {/* Academic dropdown menu */}
            <li className="sidebar-menu-item">
              <div 
                className="sidebar-menu-link submenu-toggle"
                onClick={() => toggleSubmenu('academic')}
              >
                <div className="menu-icon-text">
                  <BookOpen size={20} />
                  <span>Akademik</span>
                </div>
                {expandedMenus.academic ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
                }
              </div>
              
              {expandedMenus.academic && (
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu-item">
                    <NavLink 
                      to="/siswa/academic/jadwal" 
                      className={({ isActive }) => `sidebar-submenu-link ${isActive ? "active" : ""}`}
                    >
                      <Calendar size={16} />
                      <span>Jadwal</span>
                    </NavLink>
                  </li>
                  <li className="sidebar-submenu-item">
                    <NavLink 
                      to="/siswa/academic/kehadiran" 
                      className={({ isActive }) => `sidebar-submenu-link ${isActive ? "active" : ""}`}
                    >
                      <ClipboardCheck size={16} />
                      <span>Kehadiran</span>
                    </NavLink>
                  </li>
                  <li className="sidebar-submenu-item">
                    <NavLink 
                      to="/siswa/academic/nilai" 
                      className={({ isActive }) => `sidebar-submenu-link ${isActive ? "active" : ""}`}
                    >
                      <FileText size={16} />
                      <span>Nilai</span>
                    </NavLink>
                  </li>
                </ul>
              )}
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