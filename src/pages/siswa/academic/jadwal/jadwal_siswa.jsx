import Sidebar from "../../../../component/sidebar/sidebar_siswa";
import "./jadwal_siswa.css";
import Calendar from "../../../../component/common/calender.jsx";
import React from "react";
import UserInfo from "../../../../component/user-info/user-info.jsx";

const Schedule = () => {
  const scheduleData = [
    {
      date: "Senin, 12 Maret 2025",
      subjects: [
        {
          name: "Matematika",
          code: "MAT120D",
          time: "07:00-08:30",
          room: "MIPA X.1",
        },
        {
          name: "Bahasa Indonesia", 
          code: "IND120D",
          time: "08:30-10:00",
          room: "MIPA X.1",
        },
        {
          name: "Fisika",
          code: "FIS120D", 
          time: "10:30-12:00",
          room: "MIPA X.1",
        },
      ],
    },
    {
      date: "Selasa, 13 Maret 2025",
      subjects: [
        {
          name: "Kimia",
          code: "KIM120D",
          time: "07:00-08:30", 
          room: "MIPA X.1",
        },
        {
          name: "Biologi",
          code: "BIO120D",
          time: "08:30-10:00",
          room: "MIPA X.1",
        },
        {
          name: "Bahasa Inggris",
          code: "ING120D",
          time: "10:30-12:00",
          room: "MIPA X.1",
        },
      ],
    },
  ];

  return (
    <section className="schedule-section card">
      <h2 className="schedule-title">Jadwal</h2>
      <div className="schedule-table-container">
        <div className="schedule-table-responsive">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="date-column">Hari/tanggal</th>
                <th>Mata Pelajaran</th>
                <th>Ruang Kelas</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((day) => (
                <React.Fragment key={day.date}>
                  <tr className="schedule-date-row">
                    <td colSpan={4} className="schedule-date-cell">
                      {day.date}
                    </td>
                  </tr>
                  {day.subjects.map((subject) => (
                    <tr className="schedule-subject-row" key={subject.code}>
                      <td className="empty-date-cell"></td>
                      <td>
                        <div className="subject-info">
                          <div className="subject-name">{subject.name}</div>
                          <div className="subject-code">{subject.code}</div>
                        </div>
                      </td>
                      <td className="schedule-room">{subject.room}</td>
                      <td className="schedule-time">{subject.time}</td>
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

const Presence = () => (
  <section className="card presence">
    <h3>Presensi</h3>
    <ul className="presence-list">
      <li>
        <span>07:00 - Matematika</span>
        <button className="presence-button">Presensi</button>
      </li>
      <li>
        <span>08:30 - Bahasa Indonesia</span>
        <button className="presence-button">Presensi</button>
      </li>
    </ul>
  </section>
);

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

const CourseReview = () => (
  <div className="card course-review">
    <h3>Course Review</h3>
    <div className="courses-container">
      <div className="courses">
        <CourseCard code="MAT120D" name="Matematika" />
        <CourseCard code="KIM120E" name="Kimia" />
        <CourseCard code="BIO120E" name="Biologi" />
        <CourseCard code="FIS120E" name="Fisika" />
      </div>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <div className="content-wrapper">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <main className="main-content">
        <div className="schedule-calendar-container">
          <div className="schedule-wrapper">
            <Schedule />
          </div>
          <div className="calendar-wrapper">
            <Calendar />
          </div>
        </div>

        <div className="info-section">
          <Attendance />
          <Presence />
          <Grade />
        </div>

        <CourseReview />
      </main>
    </div>
  </div>
);

export default Dashboard;