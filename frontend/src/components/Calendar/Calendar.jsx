import React, { useState, useEffect } from "react";
import icon_prev from "../../assets/icons/icon_arrow_left.svg";

export default function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [monthLabel, setMonthLabel] = useState("");
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const attrs = [
      { color: "#4CAF50", label: "Approved Leaves" },
      { color: "#FFC107", label: "Pending Leaves" },
      { color: "#F44336", label: "Rejected Leaves" },
      { color: "#2196F3", label: "Working Days" },
    ];
    setAttributes(attrs);
  }, []);

  useEffect(() => {
    renderCalendar(currentDate);
  }, [currentDate]);

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthName = date.toLocaleString("default", { month: "long" });
    setMonthLabel(`${monthName} ${year}`);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const prevMonthDays = prevLastDay.getDate();

    const totalCells = 42;
    const allDates = [];

    // === PREVIOUS MONTH DAYS ===
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      allDates.push({ day, type: "prev" });
    }

    // === CURRENT MONTH DAYS ===
    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      allDates.push({ day, type: isToday ? "today" : "current" });
    }

    // === NEXT MONTH DAYS ===
    const filledCells = startDay + totalDays;
    const nextDays = totalCells - filledCells;
    for (let day = 1; day <= nextDays; day++) {
      allDates.push({ day, type: "next" });
    }

    setDates(allDates);
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="top-options">
          <img
            src={icon_prev}
            onClick={prevMonth}
            style={{ cursor: "pointer" }}
          />
          <p id="month">{monthLabel}</p>
          <img
            src={icon_prev}
            onClick={nextMonth}
          />
        </div>

        {/* Days */}
        <div className="days">
          {days.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="dates">
          {dates.map((d, index) => (
            <div
              key={index}
              className={`date ${
                d.type === "today"
                  ? "today"
                  : d.type === "prev"
                  ? "faded prev-month"
                  : d.type === "next"
                  ? "faded next-month"
                  : ""
              }`}
            >
              {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* Attributes Legend */}
      <div className="calendar-attributes">
        {attributes.map((attr, i) => (
          <div className="attr-item" key={i}>
            <span className="color" style={{ background: attr.color }}></span>
            <span>{attr.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
