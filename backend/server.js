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

/* =======================
   TEST ROUTE
======================= */
app.get("/api", (req, res) => {
  res.json({ message: "API fonctionne !" });
});

/* =======================
   USERS ROUTE
======================= */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("ERROR USERS:", err.message);
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message,
    });
  }
});

/* =======================
   REACT BUILD
======================= */
const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

app.get("/.*/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* =======================
   CONNECT DB + START SERVER
======================= */
async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI manquant dans .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Serveur lancé sur port " + PORT);
    });

  } catch (err) {
    console.log("ERREUR CONNEXION DB:", err.message);
  }
}

start();