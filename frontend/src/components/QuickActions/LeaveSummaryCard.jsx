import React from "react";

export default function LeaveSummaryCard() {
  return (
    <div className="action-card">
      <div className="card-header">
        <p>Leave Summary</p>
      </div>
      <div className="card-body">
        <p>
          Balance Leaves: <span>11</span>
        </p>
        <p>
          Pending Approval: <span>2</span>
        </p>
        <p>
          Approved Leaves: <span>1</span>
        </p>
        <p>
          Completed Leaves: <span>1</span>
        </p>
        <button>Apply Leave</button>
      </div>
    </div>
  );
}
