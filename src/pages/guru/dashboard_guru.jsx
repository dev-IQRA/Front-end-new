import React, { useState } from 'react';
import './dashboard_guru.css';
import Calendar from '../../component/common/calender';

const DashboardGuru = () => {
  // State declarations
  const [selectedDate, setSelectedDate] = useState(29);

  // Mock data
  const todayClasses = [
    { time: "07:00", endTime: "08:30", course: "Matematika", code: "MAT001" },
    { time: "09:00", endTime: "10:30", course: "Bahasa Indonesia", code: "BIN001" }
  ];

  const courses = [
    { id: 1, code: "MAT001", name: "Matematika" },
    { id: 2, code: "BIN001", name: "Bahasa Indonesia" },
    { id: 3, code: "FIS001", name: "Fisika" },
    { id: 4, code: "BIO001", name: "Biologi" }
  ];

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2><span className="highlight">IQRA</span>Student</h2>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Academic</div>
          {/* Add other menu items here */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Announcement Section */}
        <div className="announcement-section">
          <h2>Pengumuman</h2>
          <p className="placeholder-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aenean placerat magna quis eros consequat porttitor. 
            Morbi tempus sapien ac dui gravida, tempus pharetra 
            magna interdum. Mauris justo elit, faucibus ut orci placerat, 
            sagittis viverra nulla.
          </p>
        </div>

        {/* Stats and Schedule Section */}
        <div className="stats-schedule-container">
          {/* Attendance Stats */}
          <div className="stats-box">
            <div className="stats-header">
              <h2>Kehadiran</h2>
              <div className="semester-selector">
                <span>Semester</span>
                <span className="semester-value">Genap 2024/2025</span>
              </div>
            </div>
            <div className="attendance-stats">
              <div className="attendance-percentage">100 %</div>
              <div className="attendance-label">Rata-rata kehadiran</div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="schedule-box">
            <h2>Presensi</h2>
            <div className="schedule-list">
              {todayClasses.map((cls, index) => (
                <div key={index} className="schedule-item">
                  <div className="time-info">
                    <div className="start-time">{cls.time}</div>
                    <div className="end-time">{cls.endTime}</div>
                  </div>
                  <div className="course-info">
                    <div className="course-name">{cls.course}</div>
                    <div className="course-code">{cls.code}</div>
                  </div>
                  <button className="presence-button">Presensi</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Review Section */}
        <div className="course-review-section">
          <div className="section-header">
            <h2>Course Review</h2>
            <div className="search-container">
              <button className="search-button">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Search
              </button>
            </div>
          </div>
          <div className="course-cards">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-banner"></div>
                <div className="course-info">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="user-profile">
          <span>Username</span>
          <div className="profile-circle">
            <span>NIS</span>
          </div>
        </div>

        {/* Calendar Component */}
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default DashboardGuru;