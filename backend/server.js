const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
const JWT_EXPIRATION_TIME = "1h";
const JWT_SECRET = Math.random().toString(36).substring(3);
connectDB();

const authenticateJWT = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Nėra autentifikacijos tokeno" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Neteisingas autentifikacijos tokenas" });
  }
};

app.post("/verify", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Tokenas yra galiojantis" });
});
const Registration = mongoose.model("administratorsList", {
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

const Client = mongoose.model("register", {
  firstName: String,
  lastName: String,
  email: String,
  date: String,
  time: String,
  duration: String,
  procedure: String,
});

const ProceduresList = mongoose.model("ProceduresList", {
  procedureName: String,
});

// Routes

app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Klaida gaunant klientų duomenis:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, date, time, duration, procedure } =
    req.body;

  try {
    const existingServiceSameTime = await Client.findOne({
      date,
      $or: [
        {
          time: { $gte: time, $lt: duration },
          procedure,
        },
        {
          time: { $lte: time },
          duration: { $gt: time },
          procedure,
        },
      ],
    });

    if (existingServiceSameTime) {
      return res.status(400).json({
        error: "Paslauga užimta tuo pačiu metu.",
      });
    }

    const newClient = new Client({
      firstName,
      lastName,
      email,
      date,
      time,
      duration,
      procedure,
    });

    await newClient.save();

    res.status(200).json({ message: "Kliento registracija sėkminga" });
  } catch (error) {
    console.error("Klaida įrašant kliento duomenis:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.post("/registration", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const existingUser = await Registration.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Vartotojas su šiuo el. paštu jau registruotas." });
    }

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Registration.findOne({ email, password });

    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "Neteisingas el. paštas arba slaptažodis." });
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION_TIME }
    );

    res.status(200).json({ message: "Prisijungimas sėkmingas", token });
  } catch (error) {
    console.error("Prisijungimo klaida:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.get("/procedureslist", async (req, res) => {
  try {
    const proceduresList = await ProceduresList.find();
    res.status(200).json(proceduresList);
  } catch (error) {
    console.error("Klaida gaunant procedūras:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.delete("/delete/:clientId", authenticateJWT, async (req, res) => {
  const registrationId = req.params.clientId;

  try {
    // Tikriname, ar įrašas su nurodytu ID egzistuoja
    const existingClient = await Client.findById(registrationId);

    if (!existingClient) {
      return res.status(404).json({ error: "Registracijos įrašas nerastas" });
    }

    // Įrašas egzistuoja, todėl jį ištriname
    await existingClient.deleteOne();

    res
      .status(200)
      .json({ message: "Registracijos įrašas ištrintas sėkmingai" });
  } catch (error) {
    console.error("Klaida trinant registracijos įrašą:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveris veikia portu: ${PORT}`);
});
