import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
 console.log(`🚀 Server running on http://localhost:${PORT}`);
});