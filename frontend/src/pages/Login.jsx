import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.scss";

import logo from "../assets/images/logo.png";
import bg from "../assets/images/login-bg.png";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employeeId && password) {
      try {
        const response = await fetch('http://localhost:5034/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: employeeId,
            password: password
          })
        });

        if (response.ok) {
          const data = await response.json();

          // ✅ Store full name from backend
          localStorage.setItem("loggedInUser", data.username);

          alert(data.message || 'Login successful');
          navigate('/dashboard');
        } else {
          alert('Invalid Employee ID or Password');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Server error, please try again later.');
      }
    } else {
      alert('Enter Employee ID and Password');
    }
  };


  return (
    <div id="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <div id="login-card">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="custom-heading">Employee Login Portal</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="#">Forgot Password?</Link>
          <button type="submit" className="button-primary">
            Log In
          </button>
          <p>
            Don’t Have An Account? <Link to="/Signup">Create One!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
