import React from "react";
import "./kehadiran_siswa.css";
import Sidebar from "../../../../component/sidebar/sidebar_siswa";

const Kehadiran = () => {
  // Mock attendance data
  const attendanceData = [
    { name: "MATEMATIKA", present: 8, absent: 0, total: 8 },
    { name: "BIOLOGI", present: 8, absent: 0, total: 8 },
    { name: "FISIKA", present: 8, absent: 0, total: 8 },
    { name: "SEJARAH", present: 8, absent: 0, total: 8 },
    { name: "BAHASA", present: 8, absent: 0, total: 8 },
    { name: "ENGLISH", present: 8, absent: 0, total: 8 },
    { name: "KIMIA", present: 8, absent: 0, total: 8 },
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="kehadiran-page">
          <h1 className="page-title">Kehadiran Saya</h1>
          <div className="attendance-legend">
            <div className="legend-item">H: Hadir</div>
            <div className="legend-item">TH: Tidak Hadir</div>
            <div className="legend-item">P: Jumlah Pertemuan</div>
          </div>

          <div className="attendance-table">
            {attendanceData.map((subject, index) => (
              <div key={index} className="subject-card">
                <div className="subject-name">{subject.name}</div>
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Kehadiran;