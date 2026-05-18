const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch((err) => console.log(err));

app.get("/api", (req, res) => {
    res.json({ message: "API fonctionne !" });
});

app.use(express.static(
    path.join(__dirname, "../frontend/build")
));

app.get(/.*/, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html")
    );
});

const PORT = process.env.PORT || 5000;

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.json({ message: "Inscription réussie" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
      });
    }

    res.json({
      message: "Connexion réussie",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});