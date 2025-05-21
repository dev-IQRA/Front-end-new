"use client"

import React, { useState } from "react"
import SidebarGuru from "../../component/sidebar/sidebar_guru"
import UserInfo from "../../component/user-info/user-info"
import "./academic_guru.css"

const AcademicGuru = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // Sample class schedule data
  const scheduleData = [
    {
      day: "Senin",
      date: "12 Maret 2025",
      classes: [
        { subject: "Matematika", code: "MAT120D", room: "MIPA X.1", time: "07:00-08:30" },
        { subject: "Bahasa Indonesia", code: "IND120D", room: "MIPA X.1", time: "08:30-10:00" },
        { subject: "Fisika", code: "FIS120D", room: "MIPA X.1", time: "10:30-12:00" },
      ],
    },
    {
      day: "Selasa",
      date: "12 Maret 2025",
      classes: [
        { subject: "Matematika", code: "MAT120D", room: "MIPA X.1", time: "07:00-08:30" },
        { subject: "Bahasa Indonesia", code: "IND120D", room: "MIPA X.1", time: "08:30-10:00" },
      ],
    },
    {
      day: "Rabu",
      date: "12 Maret 2025",
      classes: [
        { subject: "Matematika", code: "MAT120D", room: "MIPA X.1", time: "07:00-08:30" },
        { subject: "Bahasa Indonesia", code: "IND120D", room: "MIPA X.1", time: "08:30-10:00" },
      ],
    }
  ]

  // Sample courses data
  const coursesData = [
    { id: "SEJ120E", name: "Sejarah", image: "/course-cover.jpg" },
    { id: "IND120E", name: "Indonesia", image: "/course-cover.jpg" },
    { id: "ENG120E", name: "English", image: "/course-cover.jpg" },
    { id: "MAT120E", name: "Matematika", image: "/course-cover.jpg" },
    { id: "FIS120E", name: "Fisika", image: "/course-cover.jpg" },
    { id: "KIM120E", name: "Kimia", image: "/course-cover.jpg" },
  ]

  // Calendar generation
  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const monthName = currentMonth.toLocaleString("default", { month: "long" })

    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="calendar">
        <div className="calendar-header">
          <h2>
            {monthName} {year}
          </h2>
          <div className="calendar-nav">
            <button onClick={() => setCurrentMonth(new Date(year, month - 1))}>&lt;</button>
            <button onClick={() => setCurrentMonth(new Date(year, month + 1))}>&gt;</button>
          </div>
        </div>
        <div className="calendar-grid">
          {weekdays.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}

          {Array(firstDayOfMonth)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

          {days.map((day) => (
            <div key={day} className={`calendar-day ${day === 29 ? "current-day" : ""}`}>
              {day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="academic-guru-container">
      <SidebarGuru activePage="academic" />

      <div className="academic-content">
        <div className="top-bar">
          <UserInfo username="Username" role="NIS" />
        </div>

        <div className="main-content">
          <div className="content-left">
              <div className="schedule-section">
                <h2>Jadwal</h2>
                <div className="schedule-container">
                  <table className="schedule-table">
                    <thead>
                      <tr>
                        <th>Hari/Tanggal</th>
                        <th>Mata Pelajaran</th>
                        <th>Ruang Kelas</th>
                        <th>Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map((day, dayIndex) => (
                        <React.Fragment key={dayIndex}>
                          {day.classes.map((classItem, classIndex) => (
                            <tr key={`${dayIndex}-${classIndex}`}>
                              {classIndex === 0 && (
                                <td className="date-column" rowSpan={day.classes.length}>
                                  <div className="day">{day.day}</div>
                                  <div className="date">{day.date}</div>
                                </td>
                              )}
                              <td className="subject-column">
                                <div className="subject-name">{classItem.subject}</div>
                                <div className="subject-code">{classItem.code}</div>
                              </td>
                              <td>{classItem.room}</td>
                              <td>{classItem.time}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
</div>

            <div className="course-section">
              <div className="course-header">
                <h2>Course Review</h2>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="course-grid">
                {coursesData
                  .filter(
                    (course) =>
                      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      course.id.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((course) => (
                    <div className="course-card" key={course.id}>
                      <div className="course-image">
                        <img src={course.image || "/placeholder.svg"} alt={course.name} />
                      </div>
                      <div className="course-info">
                        <div className="course-code">{course.id}</div>
                        <div className="course-name">{course.name}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="content-right">{generateCalendar()}</div>
        </div>
      </div>
    </div>
  )
}

export default AcademicGuru
