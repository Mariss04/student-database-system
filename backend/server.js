const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./middleware/authMiddleware"), require("./routes/studentRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Student Database Backend Running...");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
