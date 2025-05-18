"use client"

import { useState, useEffect } from "react"
import { Home, BookOpen, Calendar, FileText, ClipboardCheck, ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import "./sidebar_siswa.css"

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("nilai") // Set "nilai" as active for demo
  const [expandedMenus, setExpandedMenus] = useState({
    academic: true // Set academic menu to be expanded by default
  })

  // Check if screen is mobile size
  useEffect(() => {

    const checkScreenSize = () => {
      
}

export default Sidebar