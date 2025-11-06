import React from "react";
import Navbar from "../components/Navbar";
import Greeting from "../components/Greeting";
import QuickActions from "../components/QuickActions/QuickActions";
import CalendarSection from "../components/Calendar/CalendarSection";
import "../styles/emp.scss";

export default function Dashboard() {
  const username = localStorage.getItem("loggedInUser");

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Greeting username={username} />
        <QuickActions />
        <CalendarSection />
      </div>
    </>
  );
}
