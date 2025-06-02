"use client"

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react"
import SidebarGuru from "../../component/sidebar/sidebar_guru"
import UserInfo from "../../component/user-info/user-info"
import Calendar from "../../component/common/calender.jsx"
import { UserContext } from "../../context/UserContext"
import axiosInstance from "../../utils/axiosInstance"
import "./academic_guru.css"

const AcademicGuru = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [jadwalGuru, setJadwalGuru] = useState([])
  const [mapelGuru, setMapelGuru] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const { user } = useContext(UserContext)

  // Fetch data from backend
  useEffect(() => {
    const fetchGuruData = async () => {
      try {
        setLoading(true)
        setError("")
        
        // Fetch jadwal guru untuk tabel jadwal
        const responseJadwal = await axiosInstance.get("/api/jadwal/guru")
        setJadwalGuru(responseJadwal.data.jadwal || [])

        // Fetch mata pelajaran yang diajar guru untuk course review
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

  // Group jadwal by day for table display
  const groupedJadwal = jadwalGuru.reduce((acc, jadwal) => {
    const day = jadwal.hari;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(jadwal);
    return acc;
  }, {});

  // Convert to array format with proper ordering
  const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const scheduleData = daysOrder
    .filter(day => groupedJadwal[day])
    .map(day => ({
      day: day,
      date: new Date().toLocaleDateString("id-ID"), // You can enhance this to show actual dates
      classes: groupedJadwal[day].map(jadwal => ({
        subject: jadwal.mapel.nama_mapel,
        code: jadwal.mapel.id,
        room: jadwal.kelas?.nama_kelas || "TBA",
        time: `${jadwal.jam_mulai}-${jadwal.jam_selesai}`
      }))
    }));

  // Dynamic navigation based on actual mapel
  const handleCourseNavigation = (mapelId, mapelName) => {
    // Map mapel names to routes
    const routeMap = {
      'sejarah': '/guru/academic/sejarah',
      'bahasa indonesia': '/guru/academic/indonesia',
      'english': '/guru/academic/english',
      'matematika': '/guru/academic/matematika',
      'fisika': '/guru/academic/fisika',
      'kimia': '/guru/academic/kimia'
    };

    const normalizedName = mapelName.toLowerCase();
    const route = routeMap[normalizedName];
    
    if (route) {
      navigate(route);
    } else {
      // Fallback for unmapped subjects
      console.log(`No route mapped for subject: ${mapelName}`);
    }
  };

  return (
    <div className="academic-guru-container">
      <SidebarGuru activePage="academic" />

      <div className="academic-content">
        <div className="top-bar">
          <UserInfo username="Username" role="NIS" />
        </div>

        <div className="main-content">
          <div className="content-left">
            <div className="calender-section">
              <Calendar currentMonth={currentMonth} setCurrentMonth ={setCurrentMonth} />
            </div>
              <div className="schedule-section">
                <h2>Jadwal</h2>
                <div className="schedule-container">
                  {loading ? (
                    <div className="loading-text">Memuat jadwal...</div>
                  ) : error ? (
                    <div className="error-text">{error}</div>
                  ) : scheduleData.length > 0 ? (
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
                                  <span className="subject-code">{classItem.code}</span>
                                  <span className="subject-name">{classItem.subject}</span>
                                </td>
                                <td>{classItem.room}</td>
                                <td>{classItem.time}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no-schedule">Tidak ada jadwal tersedia</div>
                  )}
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
                {loading ? (
                  <div className="loading-text">Memuat mata pelajaran...</div>
                ) : error ? (
                  <div className="error-text">{error}</div>
                ) : mapelGuru.length > 0 ? (
                  mapelGuru
                    .filter(
                      (course) =>
                        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.id.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((course) => (
                      <div className="course-card" 
                        key={course.id}
                        onClick={() => handleCourseNavigation(course.id, course.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="course-image">
                          <img src="/course-cover.jpg" alt={course.name} />
                        </div>
                        <div className="course-info">
                          <div className="course-code">{course.id}</div>
                          <div className="course-name">{course.name}</div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="no-courses">Tidak ada mata pelajaran yang diajar</div>
                )}
              </div>
            </div>
          </div>

          <div className="content-right"></div>
        </div>
      </div>
    </div>
  )
}

export default AcademicGuru
