const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const User = require("./models/User");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES API
========================= */

// Test API
app.get("/api", (req, res) => {
  res.json({ message: "API fonctionne !" });
});

// GET USERS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("ERREUR USERS:", err);
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message,
    });
  }
});

/* =========================
   REACT BUILD (PRODUCTION)
========================= */

app.use(express.static(path.join(__dirname, "build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* =========================
   MONGODB + SERVER START
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erreur MongoDB:", err);
  });