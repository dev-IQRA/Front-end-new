"use client"

import { useState } from "react"
import Sidebar from "../../component/sidebar/sidebar_admin.jsx"
import UserInfo from "../../component/user-info/user-info.jsx"
import "./dashboard_admin.css"

const DashboardAdmin = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)) // March 2025

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 29 // Highlighting day 29 as in the design
      days.push(
        <div key={day} className={`calendar-day ${isToday ? "today" : ""}`}>
          {day}
        </div>,
      )
    }

    return days
  }

  const getMonthName = () => {
    const options = { month: "long", year: "numeric" }
    return currentMonth.toLocaleDateString("id-ID", options)
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Sample online users data
  const onlineUsers = [
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
    { username: "Username", nim: "NIM" },
  ]

  // Sample announcement text
  const announcementText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisl est. Donec eget feugiat est. Donec non dictum augue. Donec sagittis fermentum.`

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <div className="announcements-section">
          <div className="section-header">
            <h2>Pengumuman</h2>
            <div className="action-buttons">
              <button className="btn-edit">
                <i className="fas fa-edit"></i>
                <span>Edit</span>
              </button>
              <button className="btn-add">
                <i className="fas fa-plus"></i>
                <span>Tambah</span>
              </button>
            </div>
          </div>

          <div className="announcements-container">
            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #1</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>

            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #2</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>

            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #3</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <aside className="dashboard-sidebar">
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <UserInfo username="Username" nim="NIS" />
        </div>

        <div className="calendar-widget">
          <div className="calendar-header">
            <h3>{getMonthName()}</h3>
            <div className="calendar-nav">
              <button onClick={previousMonth} className="calendar-nav-btn">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={nextMonth} className="calendar-nav-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {daysOfWeek.map((day) => (
              <div key={day} className="calendar-day-name">
                {day}
              </div>
            ))}
            {generateCalendarDays()}
          </div>
        </div>

        <div className="online-users-widget">
          <h3>Online User</h3>
          <ul className="online-users-list">
            {onlineUsers.map((user, index) => (
              <li key={index} className="online-user-item">
                <div className="user-avatar"></div>
                <div className="user-info">
                  <div className="username">{user.username}</div>
                  <div className="nim">{user.nim}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default DashboardAdmin
