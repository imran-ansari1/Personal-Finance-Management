import dotenv, { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./dbconnection/index.js";
const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config(
  {
    path: "./.env",
  }
);

connectDB();
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
 console.log(`🚀 Server running on http://localhost:${PORT}`);
});