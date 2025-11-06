import React from "react";
import LeaveSummaryCard from "./LeaveSummaryCard";
import TimesheetCard from "./TimesheetCard";
import ProjectsCard from "./ProjectsCard";
import AlertsCard from "./AlertsCard";

export default function QuickActions() {
  return (
    <div className="quick-actions">
      <LeaveSummaryCard />
      <TimesheetCard />
      <ProjectsCard />
      <AlertsCard />
    </div>
  );
}
