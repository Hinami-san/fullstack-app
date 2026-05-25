const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./models/User");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch((err) => console.log(err));

app.get("/api", (req, res) => {
  res.json({ message: "API fonctionne !" });
});

app.get("/api/users", async (req, res) => {
  try {
    console.log("Route /api/users appelée");

    const users = await User.find();

    console.log("Users trouvés:", users);

    res.json(users);
  } catch (err) {
    console.log("ERREUR USERS:", err);

    res.status(500).json({
      message: "Erreur serveur",
      error: err.message
    });
  }
});


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});