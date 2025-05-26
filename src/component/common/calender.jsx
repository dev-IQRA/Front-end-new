import React, { useState } from "react";
import "./calender.css";    

const Calendar = ({ currentMonth }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonthIndex, day));
  };

  return (
    <div className="calendar-container">
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
            selectedDate.getMonth() === currentMonthIndex && 
            selectedDate.getFullYear() === currentYear;

          const isToday =
            today.getDate() === dayNumber &&
            today.getMonth() === currentMonthIndex &&
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
