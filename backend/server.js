const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5500;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

connectDB();

const Registration = mongoose.model("administratorsList", {
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

// Routes
app.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const registration = new Registration({
      email,
      firstName,
      lastName,
      password,
    });

    await registration.save();

    res.status(200).json({ message: "Registracija sėkminga" });
  } catch (error) {
    console.error("Klaida įrašant registracijos duomenis:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveris veikia portu: ${PORT}`);
});
