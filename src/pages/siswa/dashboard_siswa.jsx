import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import Sidebar from "../../component/sidebar/sidebar_siswa.jsx"
import UserInfo from "../../component/user-info/user-info.jsx"
import "./dashboard_siswa.css"

const DashboardSiswa = () => {
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

  // Sample announcement text
  const announcementText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisl est. Donec eget feugiat est. Donec non dictum augue. Donec sagittis fermentum.`

  // Sample course data
  const courses = [
    { code: "MAT120D", name: "Matematika", color: "#e67e22" },
    { code: "KIM120E", name: "Kimia", color: "#e67e22" },
    { code: "BIO120E", name: "Biologi", color: "#e67e22" },
    { code: "FIS120E", name: "Fisika", color: "#e67e22" },
  ]

  // Sample schedule data
  const scheduleItems = [
    { time: "07:00", subject: "Matematika", code: "MAT120D" },
    { time: "08:30", subject: "Bahasa Indonesia", code: "IND120G" },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        {/* Announcement Section */}
        <div className="announcements-section">
          <h2>Pengumuman</h2>
          <p>{announcementText}</p>
        </div>

        {/* Info Cards Section */}
        <div className="info-cards-section">
          {/* Attendance Card */}
          <div className="info-card">
            <h3>Kehadiran</h3>
            <div className="info-card-content">
              <div className="semester-info">
                <span>Semester</span>
                <span className="semester-value">Genap 2024/2025</span>
              </div>
              <div className="attendance-value">100 %</div>
              <div className="attendance-label">Rata-rata kehadiran</div>
            </div>
          </div>

          {/* Presence Card */}
          <div className="info-card">
            <h3>Presensi</h3>
            <div className="info-card-content">
              <div className="schedule-list">
                {scheduleItems.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <div className="schedule-time">{item.time}</div>
                    <div className="schedule-details">
                      <div className="schedule-subject">{item.subject}</div>
                      <div className="schedule-code">{item.code}</div>
                    </div>
                    <button className="presence-btn">Presensi</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grades Card */}
          <div className="info-card">
            <h3>Nilai</h3>
            <div className="info-card-content">
              <div className="semester-info">
                <span className="semester-value">Genap 2024/2025</span>
              </div>
              <div className="grade-value">93.2</div>
              <div className="grade-label">Rata-rata nilai</div>
            </div>
          </div>
        </div>

        {/* Course Review Section */}
        <div className="course-review-section">
          <div className="section-header">
            <h3>Course Review</h3>
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <Search size={16} className="search-icon" />
            </div>
          </div>

          <div className="course-cards">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-card-header" style={{ backgroundColor: course.color }}></div>
                <div className="course-card-content">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="dashboard-sidebar">
        <div className="user-profile">
          <UserInfo username="Username" nim="NIS" />
        </div>

        <div className="calendar-widget">
          <div className="calendar-header">
            <h3>Maret 2025</h3>
            <div className="calendar-nav">
              <button onClick={previousMonth} className="calendar-nav-btn">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="calendar-nav-btn">
                <ChevronRight size={16} />
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
      </aside>
    </div>
  )
}

export default DashboardSiswa
