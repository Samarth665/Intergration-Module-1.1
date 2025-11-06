import React from "react";

export default function AlertsCard() {
  return (
    <div className="action-card" id="quick-alerts">
      <div className="card-header">
        <p>Latest Alerts</p>
      </div>
      <div className="card-body">
        <div className="alert">
          <p className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, illum.
          </p>
          <p className="author">- Manager</p>
        </div>
        <div className="alert">
          <p className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, illum.
          </p>
          <p className="author">- Manager</p>
        </div>
      </div>
    </div>
  );
}
