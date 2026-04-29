const express = require("express");
const storage = require("../data/storage");
const verifyToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");

const router = express.Router();
let id = 1;

router.get("/", verifyToken, (req, res) => {
  res.json(storage);
});

router.post("/", verifyToken, requireAdmin, (req, res) => {
  const data = { id: id++, ...req.body };
  storage.push(data);
  res.json(data);
});

module.exports = router;