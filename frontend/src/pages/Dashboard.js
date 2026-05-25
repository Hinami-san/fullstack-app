import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Dashboard</h1>

      <h3 className="mt-3">
        Bienvenue {user ? user.username : "User"}
      </h3>

      <button className="btn btn-danger mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}