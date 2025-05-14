import Sidebar from "../../../../component/sidebar/sidebar_siswa";
import "./jadwal_siswa.css";
import Calendar from "../../../../component/common/calender.jsx";
import React from "react";
import UserInfo from "../../../../component/user-info/user-info";

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
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Hari/tanggal</th>
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
  <div className="card attendance">
    <h3>Kehadiran</h3>
    <div>
      Semester
      <br />
      <strong>Genap 2024/2025</strong>
    </div>
    <div className="value">100%</div>
    <div>Rata-rata kehadiran</div>
  </div>
);
const Presence = () => (
  <section className="card presence">
    <h3>Presensi</h3>
    <ul>
      <li>
        <span>07:00 - Matematika</span>
        <button>Presensi</button>
      </li>
      <li>
        <span>08:30 - Bahasa Indonesia</span>
        <button>Presensi</button>
      </li>
    </ul>
  </section>
);

const Grade = () => (
  <div className="card grade">
    <h3>Nilai</h3>
    <div>Genap 2024/2025</div>
    <div className="value">93.2</div>
    <div>Rata-rata nilai</div>
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
  <div className="course-review">
    <h3>Course Review</h3>
    <div className="courses">
      <CourseCard code="MAT120D" name="Matematika" />
      <CourseCard code="KIM120E" name="Kimia" />
      <CourseCard code="BIO120E" name="Biologi" />
      <CourseCard code="FIS120E" name="Fisika" />
    </div>
  </div>
);
const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <UserInfo />
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
      <Calendar />
    </main>
  </div>
);

export default Dashboard;