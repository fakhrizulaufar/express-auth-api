const express = require("express");
const bcrypt = require("bcryptjs");
const users = require("../data/users");
const generateToken = require("../utils/generateToken");

const router = express.Router();
let id = 1;

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: id++,
    email,
    password: hashed,
    role: role || "user",
  };

  users.push(user);
  res.json(user);
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = generateToken(user);

  res.cookie("token", token, { httpOnly: true });

  res.json({ message: "Login success" });
});

module.exports = router;