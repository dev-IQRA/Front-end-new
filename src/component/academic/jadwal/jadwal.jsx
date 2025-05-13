import Sidebar from "../../sidebar/sidebar.jsx";
import "./jadwal.css";
import Calendar from "../../calendar/calendar.jsx";
import React from "react";

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
      ],
    },
  ];

  return (
    <section className="schedule-section card">
      <h2 className="schedule-title">Jadwal</h2>
      <div className="schedule-table-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Hari/tangga;</th>
              <th>Mata Pelajaran</th>
              <th>Ruang Kelas</th>
              <th>Waktu</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((day) => (
              <React.Fragment key={day.date}>
                <tr className="schedule-date-row">
                  <td colSpan={1} className="schedule-date-cell">
                    {day.date}
                  </td>
                </tr>
                {day.subjects.map((subject) => (
                  <tr className="schedule-subject-row" key={subject.code}>
                    <td aria-hidden="true"></td>{" "}
                    {/* Empty cell to align with date row above */}
                    <td>
                      <div
                        className="subject-name"
                        style={{ color: "#a72608", fontWeight: "600" }}
                      >
                        {subject.name}
                      </div>
                      <div className="subject-code">{subject.code}</div>
                    </td>
                    <td className="schedule-room text-center">
                      {subject.room}
                    </td>
                    <td className="schedule-time text-center">
                      {subject.time}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Attendance = () => (
  <section className="attendance-card card">
    <h3>Kehadiran</h3>
    <div>
      Semester
      <br />
      <strong>Genap 2024/2025</strong>
    </div>
    <div className="attendance-value">100%</div>
    <div>Rata-rata kehadiran</div>
  </section>
);

const Presence = () => (
  <section className="presence-card card">
    <h3>Presensi</h3>
    <ul>
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
  <section className="grade-card card">
    <h3>Nilai</h3>
    <div>Genap 2024/2025</div>
    <div className="grade-value">93.2</div>
    <div>Rata-rata nilai</div>
  </section>
);

const CourseCard = ({ code, name }) => (
  <div className="course-card">
    <div className="course-graphic" />
    <div className="course-info">
      <span className="course-code">{code}</span>
      <div className="course-name">{name}</div>
    </div>
  </div>
);

const CourseReview = () => (
  <section className="course-review-section card">
    <h3>Course Review</h3>
    <div className="courses-list">
      <CourseCard code="MAT120D" name="Matematika" />
      <CourseCard code="KIM120E" name="Kimia" />
      <CourseCard code="BIO120E" name="Biologi" />
      <CourseCard code="FIS120E" name="Fisika" />
    </div>
  </section>
);

const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <Calendar />
    <main className="main-content">
      <div className="top-section">
        <Schedule />
      </div>
      <div className="info-section">
        <Attendance />
        <Presence />
        <Grade />
      </div>
      <CourseReview />
    </main>
  </div>
);

export default Dashboard;
