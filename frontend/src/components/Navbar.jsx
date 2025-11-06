import React from "react";
import logo from "../assets/images/logo.png";
import icon_user from "../assets/icons/icon_user.svg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} />
        <p>Medhjani Services</p>
      </div>

      <ul className="menu">
        <li className="menu-item active">Dashboard</li>
        <li className="menu-item">Leave</li>
        <li className="menu-item">Timesheet</li>
        <li className="menu-item">Projects</li>
        <li className="menu-item">Policies</li>
      </ul>

      <div className="profile">
        <img src={icon_user} />
      </div>
    </nav>
  );
}
