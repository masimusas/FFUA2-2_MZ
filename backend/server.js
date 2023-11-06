// Importuojame reikalingas bibliotekas ir modulius
const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Sukuriame Express aplikaciją
const app = express();
const PORT = process.env.PORT || 5500;

// Konfigūruojame CORS kuris leidžia bendrauti frontend su backend
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Parsiunčiame JSON užklausas
app.use(bodyParser.json());
const JWT_EXPIRATION_TIME = "1h";
const JWT_SECRET = Math.random().toString(36).substring(3);
// Prisijungiame prie MongoDB duomenų bazės
connectDB();

// JWT autentifikacijos middleware
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

// Užklausos patikrinimas, ar JWT yra galiojantis
app.post("/verify", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Tokenas yra galiojantis" });
});

// Sukuriame MongoDB modelius
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

// Gauname visus klientus
app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Klaida gaunant klientų duomenis:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// Registruojame naują klientą
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, date, time, duration, procedure } =
    req.body;

  try {
    // Tikriname, ar paslauga užimta tuo pačiu metu
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

    // Sukuriame naują kliento įrašą ir išsaugome jį
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

// Registruojame naują administratorių
app.post("/registration", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    // Tikriname, ar vartotojas su tokiu el. paštu jau egzistuoja
    const existingUser = await Registration.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Vartotojas su šiuo el. paštu jau registruotas." });
    }

    // Sukuriame naują registracijos įrašą ir išsaugome jį
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

// Prisijungimo funkcija
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tikriname, ar vartotojas su nurodytu el. paštu ir slaptažodžiu egzistuoja
    const existingUser = await Registration.findOne({ email, password });

    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "Neteisingas el. paštas arba slaptažodis." });
    }
    // Sukuriame JWT tokeną ir grąžiname jį kartu su sėkmingos prisijungimo žinute
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

// Gauname visų procedūrų sąrašą
app.get("/procedureslist", async (req, res) => {
  try {
    const proceduresList = await ProceduresList.find();
    res.status(200).json(proceduresList);
  } catch (error) {
    console.error("Klaida gaunant procedūras:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});
// Įrašų trinimo funkcija
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

    // Grąžiname sėkmingos ištrynimo žinutę
    res
      .status(200)
      .json({ message: "Registracijos įrašas ištrintas sėkmingai" });
  } catch (error) {
    // Jei įvyksta klaida, išvedame klaidos pranešimą ir grąžiname serverio klaidos statusą
    console.error("Klaida trinant registracijos įrašą:", error.message);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// Paleidžiame serverį ir stebime, ar jis sėkmingai pasiekia nurodytą portą
app.listen(PORT, () => {
  console.log(`Serveris veikia portu: ${PORT}`);
});
