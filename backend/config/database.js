const mongoose = require("mongoose");
require("dotenv").config();

// Define your database URL
const DB_URL = process.env.DB_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // Use IPv4
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = { connectToDatabase };
