import Sidebar from "../../../../component/sidebar/sidebar_siswa";
import "./jadwal_siswa.css";
import Calendar from "../../../../component/common/calender.jsx";
import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../../../../component/user-info/user-info.jsx";
import { UserContext } from "../../../../context/UserContext";
import axiosInstance from "../../../../utils/axiosInstance";

// Bagian Schedule dengan pembungkus scrollable
const Schedule = ({ jadwalData, loading, error }) => {
  // Group jadwal by day
  const groupedJadwal = jadwalData.reduce((acc, jadwal) => {
    const day = jadwal.hari;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(jadwal);
    return acc;
  }, {});

  // Convert to array format with proper ordering
  const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const scheduleData = daysOrder
    .filter(day => groupedJadwal[day])
    .map(day => ({
      date: day,
      subjects: groupedJadwal[day].map(jadwal => ({
        name: jadwal.mapel.nama_mapel,
        code: jadwal.mapel.id,
        time: `${jadwal.jam_mulai}-${jadwal.jam_selesai}`,
        room: jadwal.kelas?.nama_kelas || "TBA",
        guru: jadwal.guru?.full_name || "TBA"
      }))
    }));

  if (loading) {
    return (
      <section className="schedule-section card">
        <h2 className="schedule-title">Jadwal</h2>
        <div className="loading-text">Memuat jadwal...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="schedule-section card">
        <h2 className="schedule-title">Jadwal</h2>
        <div className="error-text">{error}</div>
      </section>
    );
  }

  if (scheduleData.length === 0) {
    return (
      <section className="schedule-section card">
        <h2 className="schedule-title">Jadwal</h2>
        <div className="no-schedule">Tidak ada jadwal tersedia</div>
      </section>
    );
  }
  return (
    <section className="schedule-section card">
      <h2 className="schedule-title">Jadwal</h2>
      {/* Pembungkus tabel dengan scroll */}
      <div className="schedule-table-container">
        <div className="schedule-table-responsive">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="date-column">Hari</th>
                <th>Mata Pelajaran</th>
                <th>Ruang Kelas</th>
                <th>Waktu</th>
                <th>Guru</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((day) => (
                <React.Fragment key={day.date}>
                  <tr className="schedule-date-row">
                    <td colSpan={5} className="schedule-date-cell">
                      {day.date}
                    </td>
                  </tr>
                  {day.subjects.map((subject, index) => (
                    <tr className="schedule-subject-row" key={`${subject.code}-${index}`}>
                      <td className="empty-date-cell"></td>
                      <td>
                        <div className="subject-info">
                          <div className="subject-name">{subject.name}</div>
                          <div className="subject-code">{subject.code}</div>
                        </div>
                      </td>
                      <td className="schedule-room">{subject.room}</td>
                      <td className="schedule-time">{subject.time}</td>
                      <td className="schedule-teacher">{subject.guru}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const Attendance = () => (
  <div className="card attendance">
    <h3>Kehadiran</h3>
    <div className="attendance-content">
      <div className="attendance-info">
        <div>Semester</div>
        <strong>Genap 2024/2025</strong>
      </div>
      <div className="attendance-value">
        <div className="value">100%</div>
        <div className="label">Rata-rata kehadiran</div>
      </div>
    </div>
  </div>
);

const Presence = ({ jadwalHariIni, loading, error }) => {
  if (loading) {
    return (
      <section className="card presence">
        <h3>Presensi</h3>
        <div className="loading-text">Memuat jadwal...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card presence">
        <h3>Presensi</h3>
        <div className="error-text">{error}</div>
      </section>
    );
  }

  if (jadwalHariIni.length === 0) {
    return (
      <section className="card presence">
        <h3>Presensi</h3>
        <div className="no-schedule">Tidak ada jadwal hari ini</div>
      </section>
    );
  }

  return (
    <section className="card presence">
      <h3>Presensi</h3>
      <ul className="presence-list">
        {jadwalHariIni.map((jadwal, index) => (
          <li key={index}>
            <span>{jadwal.jam_mulai} - {jadwal.jam_selesai} - {jadwal.mapel.nama_mapel}</span>
            <button className="presence-button">Presensi</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Grade = () => (
  <div className="card grade">
    <h3>Nilai</h3>
    <div className="grade-content">
      <div>Genap 2024/2025</div>
      <div className="value">93.2</div>
      <div className="label">Rata-rata nilai</div>
    </div>
  </div>
);

const CourseCard = ({ code, name }) => (
  <div className="course-card">
    <div className="course-graphic"></div>
    <div className="course-info">
      <span className="course-code">{code}</span>
      <div className="course-name">{name}</div>
    </div>
  </div>
);

const CourseReview = ({ jadwalData, loading, error }) => {
  // Extract unique courses from jadwal data
  const uniqueCourses = jadwalData.reduce((acc, jadwal) => {
    const existing = acc.find(course => course.code === jadwal.mapel.id);
    if (!existing) {
      acc.push({
        code: jadwal.mapel.id,
        name: jadwal.mapel.nama_mapel,
        color: "#e67e22"
      });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="card course-review">
        <h3>Course Review</h3>
        <div className="loading-text">Memuat mata pelajaran...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card course-review">
        <h3>Course Review</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="card course-review">
      <h3>Course Review</h3>
      <div className="courses-container">
        <div className="courses">
          {uniqueCourses.length > 0 ? (
            uniqueCourses.map((course, index) => (
              <CourseCard 
                key={course.code}
                code={course.code} 
                name={course.name} 
              />
            ))
          ) : (
            <div className="no-courses">Tidak ada mata pelajaran tersedia</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [allJadwal, setAllJadwal] = useState([]);
  const [jadwalHariIni, setJadwalHariIni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  // Fetch jadwal data from backend
  useEffect(() => {
    const fetchJadwalData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch all jadwal for schedule and course review
        const responseAll = await axiosInstance.get("/api/jadwal/siswa");
        setAllJadwal(responseAll.data.jadwal || []);

        // Fetch today's jadwal for presence
        const responseHariIni = await axiosInstance.get("/api/jadwal/siswa/hari-ini");
        setJadwalHariIni(responseHariIni.data.jadwal || []);

      } catch (error) {
        console.error("Error fetching jadwal:", error);
        setError("Gagal memuat jadwal. Pastikan Anda terdaftar di kelas.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'siswa') {
      fetchJadwalData();
    }
  }, [user]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content-wrapper">
        <div className="user-info-container">
          <UserInfo />
        </div>
        <main className="main-content">
          <div className="schedule-calendar-container">
            <div className="schedule-wrapper">
              <Schedule 
                jadwalData={allJadwal} 
                loading={loading} 
                error={error} 
              />
            </div>
            <div className="calendar-wrapper">
              <Calendar />
            </div>
          </div>

          <div className="info-section">
            <Attendance />
            <Presence 
              jadwalHariIni={jadwalHariIni} 
              loading={loading} 
              error={error} 
            />
            <Grade />
          </div>

          <CourseReview 
            jadwalData={allJadwal} 
            loading={loading} 
            error={error} 
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;