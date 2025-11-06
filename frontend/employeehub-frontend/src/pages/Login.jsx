import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/style.scss";

import logo from "../assets/images/logo.png";
import bg from "../assets/images/login-bg.png";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password");
      return;
    }
    console.log("Attempting login:", employeeId, password);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5057/api/auth/login", {
        employeeId,
        password,
      });


      localStorage.setItem("token", response.data.token);
      console.log("Login success:", response.data);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>

          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
