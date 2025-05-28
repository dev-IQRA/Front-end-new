import React from "react"
import Sidebar from "../../component/sidebar/sidebar_admin.jsx"
import Calender from "../../component/common/calender.jsx"
import "./dashboard_admin.css"

const DashboardAdmin = () => {
  const onlineUsers = [
    { username: "Brooklyn", nim: "102999" },
    { username: "Dea", nim: "23001" },
    { username: "Jesslyn", nim: "30000" },
    { username: "Michael", nim: "30001" },
    { username: "Sophia", nim: "30002" },
    { username: "Liam", nim: "30003" },
    { username: "Olivia", nim: "30004" },
    { username: "Noah", nim: "30005" },
    { username: "Emma", nim: "30006" },
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
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input" 
            />
        </div>

        <div className="calendar-widget">
            <Calender />
        </div>

        <div className="online-users-widget">
          <h3>Online User</h3>
              <ul className="online-users-list">
                {onlineUsers.map((user, index) => (
                  <li key={index} className="online-user-item">
                    <div className="user-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
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
