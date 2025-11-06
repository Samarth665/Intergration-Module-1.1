import React from "react";

export default function TimesheetCard() {
  return (
    <div className="action-card">
      <div className="card-header">
        <p>Timesheet Status</p>
      </div>
      <div className="card-body">
        <div className="input-field">
          <span>Select Date: </span>
          <input type="date" />
        </div>
        <div className="input-field">
          <span>Start Time: </span>
          <input type="time" />
        </div>
        <div className="input-field">
          <span>End Time: </span>
          <input type="time" />
        </div>
        <span id="hours-worked">Hours Worked: 14 Hrs</span>
        <button>Submit Timesheet</button>
      </div>
    </div>
  );
}
