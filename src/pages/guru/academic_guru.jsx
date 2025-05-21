import React, { useState, useEffect } from 'react';
import Sidebar_guru from "../../component/sidebar/sidebar_guru.jsx"
import './academic_guru.css';
import UserInfo from "../../component/user-info/user-info.jsx";
import Calendar from "../../../component/common/calendar.jsx";

const AcademicGuru = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Fetch schedules data
    setSchedules([
      {
        id: 1,
        subject: 'Matematika',
        code: 'MAT120D',
        class: 'MIPA X.1',
        time: '07:00-08:30',
        day: 'Senin',
        date: '12 Maret 2025'
      },
      {
        id: 2,
        subject: 'Bahasa Indonesia',
        code: 'IND120E',
        class: 'MIPA X.1',
        time: '08:30-10:00',
        day: 'Senin',
        date: '12 Maret 2025'
      },
      {
        id: 3,
        subject: 'Fisika',
        code: 'FIS120G',
        class: 'MIPA X.1',
        time: '10:30-12:00',
        day: 'Senin',
        date: '12 Maret 2025'
      }
    ]);
  }, []);

  return (
    <div className="academic-container">
      <Sidebar_guru />
      
      <div className="academic-content">
        <div className="header">
          <h1>Jadwal</h1>
          <UserInfo username="Username" />
        </div>

        <div className="main-content">
          <div className="left-section">
            <div className="schedule-section">
              <div className="date-header">
                <h3>Hari/Tanggal</h3>
                <h3>Senin, 12 Maret 2025</h3>
              </div>

              <div className="schedule-table">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="schedule-row">
                    <div className="subject-info">
                      <span className="subject-name">{schedule.subject}</span>
                      <span className="subject-code">{schedule.code}</span>
                    </div>
                    <div className="class-info">{schedule.class}</div>
                    <div className="time-info">{schedule.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="course-review">
              <div className="section-header">
                <h2>Course Review</h2>
                <input type="search" placeholder="Search" />
              </div>
              <div className="course-grid">
                <div className="course-card">
                  <div className="course-image"></div>
                  <div className="course-info">
                    <span className="course-code">SEJ120E</span>
                    <span className="course-name">Sejarah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-section">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicGuru;