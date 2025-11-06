import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("https://localhost:7057/api/employee", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // if your backend expects cookies
    })
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Employee Dashboard</h2>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.fullName} ({emp.employeeId})
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
