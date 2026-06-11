const express = require("express");
const { createToken } = require("../utils/token");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
    return res.status(500).json({ message: "Admin login is not configured." });
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken({ email });

  res.json({ message: "Login successful.", token });
});

module.exports = router;
