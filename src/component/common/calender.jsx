import React, { useState } from "react";
import "./calender.css";    

const Calendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = 2; // March
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = 31;

  const [activeDay, setActiveDay] = useState(today.getDate());
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="calendar-overlay"
      style={{
        width: "287px",
        height: "287px",
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "30px",
        padding: "30px 15px",
      }}
    >
      {/* Header */}
      <div className="calendar-header">
        <h3 style={{ margin: "0 0 15px 0", color: "var(--primary-color)" }}>
          {new Date().toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      {/* Weekdays Row */}
      <div className="weekdays-grid">
        {weekdays.map((day) => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="dates-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNumber = index + 1;
          const isActive = dayNumber === activeDay;
          return (
            <button
              key={dayNumber}
              className={`date-cell ${isActive ? "active" : ""}`}
              onClick={() => setActiveDay(dayNumber)}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;