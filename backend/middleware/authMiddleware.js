const { verifyToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Login required." });
  }

  try {
    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired login." });
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired login." });
  }
};

module.exports = authMiddleware;
