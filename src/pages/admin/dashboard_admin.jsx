import React, { useState } from 'react';
import './dashboard_admin.css';
import { User } from 'lucide-react';
import Sidebar from "../../../../component/sidebar/sidebar_siswa.jsx";

function DashboardAdmin() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [currentDate] = useState(new Date(2025, 2, 29)); // March 29, 2025
  
  const menuItems = ['Dashboard', 'Kelola Akun'];
  
  // Generate calendar data for March 2025
  const generateCalendarDays = () => {
    const year = 2025;
    const month = 2; // 0-indexed, 2 = March
    const firstDay = new Date(year, month, 1).getDay(); // Get the day of week of the first day (0 = Sunday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    
    const calendarDays = [];
    
    // Fill in empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: null, isToday: false });
    }
    
    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ 
        day: i, 
        isToday: i === currentDate.getDate() 
      });
    }
    
    return calendarDays;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Mock data for online users
  const onlineUsers = Array(9).fill().map((_, i) => ({
    username: 'Username',
    nim: 'NIM'
  }));
  
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <h1>IQRA<span>Student</span></h1>
        </div>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`menu-item ${activeMenu === item ? 'active' : ''}`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      
      <div className="main-content">
        <div className="content-container">
          <div className="announcement-section">
            <div className="section-header">
              <h2>Pengumuman</h2>
              <div className="action-buttons">
                <button className="btn-edit">Edit</button>
                <button className="btn-add">+ Tambah</button>
              </div>
            </div>
            <div className="announcement-content">
              {Array(3).fill().map((_, index) => (
                <div key={index} className="announcement-block">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisi est. Donec eget feugiat est. Donec non dictum augue. Donec sagittis fermentum.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="right-sidebar">
          <div className="header-row">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <div className="user-profile">
              <div className="username">Username<br /><span>NIS</span></div>
              <div className="avatar">
                <User />
              </div>
            </div>
          </div>
          
          <div className="calendar-section">
            <div className="calendar-header">
              <h2>Maret 2025</h2>
              <div className="calendar-nav">
                <button className="btn-prev">&#8249;</button>
                <button className="btn-next">&#8250;</button>
              </div>
            </div>
            <div className="calendar-body">
              <div className="weekdays">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
              </div>
              <div className="calendar-days">
                {calendarDays.map((dayObj, index) => (
                  <div 
                    key={index} 
                    className={`calendar-day ${!dayObj.day ? 'empty' : ''} ${dayObj.isToday ? 'today' : ''}`}
                  >
                    {dayObj.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="online-users-section">
            <h2>Online User</h2>
            <div className="online-users-list">
              {onlineUsers.map((user, index) => (
                <div key={index} className="online-user">
                  <div className="user-avatar">
                    <User />
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-nim">{user.nim}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;