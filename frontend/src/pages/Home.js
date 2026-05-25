import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Bienvenue sur mon App Full Stack</h1>

      <Link className="btn btn-primary m-2" to="/login">
        Login
      </Link>

      <Link className="btn btn-success m-2" to="/register">
        Register
      </Link>
    </div>
  );
}