import dotenv, { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./dbconnection/index.js";
import user from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config(
  {
    path: "./.env",
  }
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api", user);

app.listen(PORT, () => {
 console.log(`🚀 Server running on http://localhost:${PORT}`);
});