const express = require("express");
const router = express.Router();

const {
  getAllTahunAjaran,
  addTahunAjaran,
  deleteDataTahunAjaran,
} = require("../controllers/tahunAjaranController");

const verifyToken = require("../middleware/verifyToken");

router.get("/get-all", verifyToken, getAllTahunAjaran);
router.post("/add-tahun", verifyToken, addTahunAjaran);
router.delete("/delete-tahun/:id", verifyToken, deleteDataTahunAjaran);

module.exports = router;
