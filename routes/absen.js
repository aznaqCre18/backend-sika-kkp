const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  addAbsen,
  getAllDataAbsen,
  getDataAbsenByPertemuan,
  editAbsen,
} = require("../controllers/absenController");

router.post("/add-absen", verifyToken, addAbsen);
router.get("/get-absen", verifyToken, getAllDataAbsen);
router.get("/get-absen/pertemuan/:id", verifyToken, getDataAbsenByPertemuan);
router.put("/edit-absen", verifyToken, editAbsen);

module.exports = router;
