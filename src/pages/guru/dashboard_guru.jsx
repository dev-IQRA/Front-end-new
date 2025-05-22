"use client"

import { useState } from "react"
import Sidebar_guru from "../../component/sidebar/sidebar_guru"
import "./dashboard_guru.css"
import Calendar from "../../component/common/calender.jsx"; // Sesuaikan dengan nama file yang benar

const DashboardGuru = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Sample data for announcements
  const announcements = [
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisl est. Donec eget feugiat est. Donec non dictum quam. Donec sagittis fermentum.",
    },
  ]

  // Sample data for classes
  const todayClasses = [
    { id: 1, time: "07:00", endTime: "08:30", subject: "Matematika", code: "MAT120D", room: "R301" },
    { id: 2, time: "09:00", endTime: "10:30", subject: "Bahasa Indonesia", code: "IND120G", room: "R204" },
    { id: 3, time: "13:00", endTime: "14:30", subject: "Fisika", code: "FIS120E", room: "R105" },
  ]

  // Sample data for attendance statistics
  const attendanceStats = {
    semester: "Genap 2024/2025",
    percentage: 100,
    totalClasses: 24,
    attendedClasses: 24,
  }

  // Sample data for courses
  const courses = [
    { id: 1, code: "MAT120D", name: "Matematika", students: 32, color: "#e67e22" },
    { id: 2, code: "KIM120E", name: "Kimia", students: 28, color: "#e67e22" },
    { id: 3, code: "BIO120E", name: "Biologi", students: 30, color: "#e67e22" },
    { id: 4, code: "FIS120E", name: "Fisika", students: 26, color: "#e67e22" },
  ]

  // Navigation for calendar
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" })
  }

  return (
    <div className="dashboard-container">
      <Sidebar_guru />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="user-info">
            <span>Username</span>
            <span className="nip">NIP</span>
            <div className="user-avatar"></div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Announcements Section */}
          <div className="dashboard-card announcement-card">
            <h2>Pengumuman</h2>
            <div className="announcement-content">
              {announcements.map((announcement) => (
                <p key={announcement.id}>{announcement.content}</p>
              ))}
            </div>
          </div>

          {/* Calendar Section */}
          <div className="dashboard-card calendar-card">
            <div className="calendar-header">
              <h2>{formatMonthYear(currentMonth)}</h2>
              <div className="calendar-nav">
                <button onClick={prevMonth} className="calendar-nav-btn">
                  &lt;
                </button>
                <button onClick={nextMonth} className="calendar-nav-btn">
                  &gt;
                </button>
              </div>
            </div>
            <Calendar currentMonth={currentMonth} />
          </div>

          {/* Attendance Section */}
          <div className="dashboard-card attendance-card">
            <h2>Kehadiran</h2>
            <div className="attendance-content">
              <div className="semester-info">
                <span>Semester</span>
                <span className="semester-value">{attendanceStats.semester}</span>
              </div>
              <div className="attendance-percentage">
                <h3>{attendanceStats.percentage} %</h3>
                <p>Rata-rata kehadiran</p>
              </div>
            </div>
          </div>

          {/* Today's Classes Section */}
          <div className="dashboard-card classes-card">
            <h2>Jadwal Mengajar Hari Ini</h2>
            <div className="classes-content">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="class-item">
                  <div className="class-time">
                    <span>{cls.time}</span>
                    <span className="time-separator">-</span>
                    <span>{cls.endTime}</span>
                  </div>
                  <div className="class-info">
                    <h4>{cls.subject}</h4>
                    <p>{cls.code}</p>
                  </div>
                  <div className="class-room">
                    <span>{cls.room}</span>
                  </div>
                  <button className="presence-btn">Presensi</button>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="dashboard-card courses-section">
            <div className="courses-header">
              <h2>Course Review</h2>
              <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" />
                <button className="search-btn">Search</button>
              </div>
            </div>
            <div className="courses-grid">
              {courses.map((course) => (
                <div key={course.id} className="course-card" style={{ backgroundColor: course.color }}>
                  <div className="course-card-content">
                    <p className="course-code">{course.code}</p>
                    <h3 className="course-name">{course.name}</h3>
                    <p className="course-students">{course.students} siswa</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardGuru
