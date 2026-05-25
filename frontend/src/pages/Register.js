import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://fullstack-app-1-e195.onrender.com/login", {
        username,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Erreur register");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="text-center">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          className="form-control my-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}