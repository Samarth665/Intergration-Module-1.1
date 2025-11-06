import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making API calls
import "../styles/style.scss";

import logo from "../assets/images/logo.png";
import bg from "../assets/images/login-bg.png";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // This function handles the form submission by calling the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5034/api/auth/register', {
        employeeId,
        email,
        fullName,
        password,
      });

      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div id="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <div id="login-card">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="custom-heading">Employee Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button-primary">
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

