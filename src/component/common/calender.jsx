import React, { useState } from "react";
import "./calender.css";    

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1); 
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1); 
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h3>
          {new Date(currentYear, currentMonth).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      
      <div className="weekdays-grid">
        {weekdays.map((day) => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="dates-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNumber = index + 1;
          const isSelected = 
            selectedDate.getDate() === dayNumber &&
            selectedDate.getMonth() === currentMonth && 
            selectedDate.getFullYear() === currentYear;

          const isToday =
            today.getDate() === dayNumber &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

          return (
            <button
              key={dayNumber}
              className={`date-cell ${isSelected ? "selected" : ""} ${
                isToday ? "today" : ""
              }`}
              onClick={() => handleDateClick(dayNumber)}
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