const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const User = require("./models/User");

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");

    app.get("/api/users", async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({
          message: "Erreur serveur",
          error: err.message
        });
      }
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("Serveur lancé sur le port " + PORT);
    });

  } catch (err) {
    console.log("Erreur MongoDB:", err.message);
  }
}

startServer();