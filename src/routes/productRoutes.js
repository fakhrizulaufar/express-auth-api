const express = require("express");
const products = require("../data/products");
const verifyToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");

const router = express.Router();
let id = 1;

router.get("/", verifyToken, (req, res) => {
  res.json(products);
});

router.post("/", verifyToken, requireAdmin, (req, res) => {
  const product = { id: id++, ...req.body };
  products.push(product);
  res.json(product);
});

router.put("/:id", verifyToken, requireAdmin, (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  Object.assign(product, req.body);
  res.json(product);
});

router.delete("/:id", verifyToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  products.splice(index, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;