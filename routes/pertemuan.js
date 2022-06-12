const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  addPertemuan,
  getAllDataPertemuan,
  getDataPertemuanById,
} = require("../controllers/pertemuanController");

router.post("/add-pertemuan", verifyToken, addPertemuan);
router.get("/get-pertemuan", verifyToken, getAllDataPertemuan);
router.get("/get-pertemuan/:id", verifyToken, getDataPertemuanById);

module.exports = router;
