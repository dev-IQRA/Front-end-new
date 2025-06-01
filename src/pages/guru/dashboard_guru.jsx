"use client"

import { useState, useEffect, useContext } from "react"
import Sidebar_guru from "../../component/sidebar/sidebar_guru"
import UserInfo from "../../component/user-info/user-info"
import "./dashboard_guru.css"
import Calendar from "../../component/common/calender.jsx"
import { UserContext } from "../../context/UserContext"
import axiosInstance from "../../utils/axiosInstance"

const DashboardGuru = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [jadwalHariIni, setJadwalHariIni] = useState([])
  const [mapelGuru, setMapelGuru] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { user } = useContext(UserContext)
  // Sample data for announcements
  const announcements = [
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisl est. Donec eget feugiat est. Donec non dictum quam. Donec sagittis fermentum.",
    },
  ]

  // Sample data for attendance statistics
  const attendanceStats = {
    semester: "Genap 2024/2025",
    percentage: 100,
    totalClasses: 24,
    attendedClasses: 24,
  }

  // Fetch data from backend
  useEffect(() => {
    const fetchGuruData = async () => {
      try {
        setLoading(true)
        
        // Fetch jadwal hari ini untuk guru
        const responseHariIni = await axiosInstance.get("/api/jadwal/guru/hari-ini")
        setJadwalHariIni(responseHariIni.data.jadwal || [])

        // Fetch mata pelajaran yang diajar guru
        const responseMapel = await axiosInstance.get("/api/jadwal/guru/mapel")
        setMapelGuru(responseMapel.data.mapel || [])

      } catch (error) {
        console.error("Error fetching guru data:", error)
        setError("Gagal memuat data. Pastikan Anda login sebagai guru.")
      } finally {
        setLoading(false)
      }
    }

    if (user && user.role === 'guru') {
      fetchGuruData()
    }
  }, [user])

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

      <div className="dashboard-content">        <div className="dashboard-header">
          <UserInfo />
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

          {/* Calendar Section - FIXED: Let Calendar component handle its own header */}
          <div className="calendar-section">
            <Calendar 
              currentMonth={currentMonth}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
            />
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
          </div>          {/* Today's Classes Section */}
          <div className="dashboard-card classes-card">
            <h2>Jadwal Mengajar Hari Ini</h2>
            <div className="classes-content">
              {loading ? (
                <div className="loading-text">Memuat jadwal...</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : jadwalHariIni.length > 0 ? (
                jadwalHariIni.map((jadwal) => (
                  <div key={jadwal.id} className="class-item">
                    <div className="class-time">
                      <span>{jadwal.jam_mulai}</span>
                      <span className="time-separator">-</span>
                      <span>{jadwal.jam_selesai}</span>
                    </div>
                    <div className="class-info">
                      <h4>{jadwal.mapel.nama_mapel}</h4>
                      <p>{jadwal.mapel.id}</p>
                    </div>
                    <div className="class-room">
                      <span>{jadwal.kelas.nama_kelas}</span>
                    </div>
                    <button className="presence-btn">Presensi</button>
                  </div>
                ))
              ) : (
                <div className="no-schedule">Tidak ada jadwal mengajar hari ini</div>
              )}
            </div>
          </div>          {/* Courses Section */}
          <div className="dashboard-card courses-section">
            <div className="courses-header">
              <h2>Course Review</h2>
              <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" />
                <button className="search-btn">Search</button>
              </div>
            </div>            <div className="courses-grid">
              {loading ? (
                <div className="loading-text">Memuat mata pelajaran...</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : mapelGuru.length > 0 ? (                mapelGuru.map((course) => (
                  <div key={course.id} className="course-card">
                    <div className="course-image" style={{ backgroundColor: course.color || "#e67e22" }}></div>
                    <div className="course-info">
                      <p className="course-code">{course.id}</p>
                      <h3 className="course-name">{course.name}</h3>
                      <p className="course-description">{course.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-courses">Tidak ada mata pelajaran yang diajar</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardGuru