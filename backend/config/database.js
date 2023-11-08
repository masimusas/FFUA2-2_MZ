const mongoose = require("mongoose");

/**
 * Funkcija, kuri prisijungia prie MongoDB duomenų bazės naudojant Mongoose.
 * @returns {Promise} - Grąžina Promise objektą su prisijungimo rezultatu.
 */
const connectDB = async () => {
  try {
    // Prijungiame prie MongoDB duomenų bazės su nurodytais prisijungimo parametrais
    await mongoose.connect(
      `mongodb+srv://sa:Vakarop1Vasarop@cluster01.xs8yzul.mongodb.net/Baigiamasis_DB?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    // Pranešame, jei prisijungimas pavyko
    console.log("MongoDB connected");
  } catch (error) {
    // Pranešame apie klaidą, jei prisijungimas nepavyko
    console.error("Error connecting to MongoDB:", error.message);
    // Baigiame programos vykdymą su klaidos kodu
    process.exit(1);
  }
};

module.exports = connectDB;
