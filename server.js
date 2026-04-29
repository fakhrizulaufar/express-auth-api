require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const storageRoutes = require("./src/routes/storageRoutes");
const verifyToken = require("./src/middleware/authMiddleware");

const app = express();

// Middleware global
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Routes
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/storage", storageRoutes);

// Protected route
app.get("/api/profile", verifyToken, (req, res) => {
  res.json(req.user);
});
app.listen(process.env.PORT, () => {
  console.log("Server running...");
});