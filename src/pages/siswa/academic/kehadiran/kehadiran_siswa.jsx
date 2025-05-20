"use client"

import { useState, useEffect } from "react"
import Sidebar from "../../../../component/sidebar/sidebar_siswa"
import UserInfo from "../../../../component/user-info/user-info" // Import the UserInfo component
import "./kehadiran_siswa.css"

const KehadiranSiswa = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch attendance data
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const data = [
            { id: 1, subject: "MATEMATIKA", present: 8, absent: 0, total: 8 },
            { id: 2, subject: "BIOLOGI", present: 8, absent: 0, total: 8 },
            { id: 3, subject: "FISIKA", present: 8, absent: 0, total: 8 },
            { id: 4, subject: "SEJARAH", present: 8, absent: 0, total: 8 },
            { id: 5, subject: "BAHASA", present: 8, absent: 0, total: 8 },
            { id: 6, subject: "ENGLISH", present: 8, absent: 0, total: 8 },
            { id: 7, subject: "KIMIA", present: 8, absent: 0, total: 8 },
          ]
          setAttendanceData(data)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching attendance data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="page-container">
      <Sidebar />

      <main className="content-area">
        <div className="content-header">
          <h1 className="page-title">Kehadiran Saya</h1>

          {/* Replace custom user profile with UserInfo component */}
          <UserInfo />
        </div>

        <div className="attendance-legend">
          <div className="legend-item">
            <span className="legend-label">H: Hadir</span>
          </div>
          <div className="legend-item">
            <span className="legend-label">TH: Tidak Hadir</span>
          </div>
          <div className="legend-item">
            <span className="legend-label">P: Jumlah Pertemuan</span>
          </div>
        </div>

        <div className="attendance-cards">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Memuat data kehadiran...</p>
            </div>
          ) : (
            attendanceData.map((subject) => (
              <div className="attendance-card" key={subject.id}>
                <div className="subject-name">{subject.subject}</div>
                <div className="attendance-stats">
                  <div className="stat-column">
                    <div className="stat-label">Hadir</div>
                    <div className="stat-value">{subject.present}</div>
                  </div>
                  <div className="stat-column">
                    <div className="stat-label">Tidak Hadir</div>
                    <div className="stat-value">{subject.absent}</div>
                  </div>
                  <div className="stat-column">
                    <div className="stat-label">Jumlah Pertemuan</div>
                    <div className="stat-value">{subject.total}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default KehadiranSiswa
