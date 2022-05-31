const express = require("express");
const router = express.Router();

const {
  addDataJadwalMapel,
  getAllDataJadwalMapel,
  getDataJadwalMapelById,
  updateDataJadwalMapel,
  deleteDataJadwalMapel,
} = require("../controllers/jadwalMapelController");
const verifyToken = require("../middleware/verifyToken");

router.post("/add-jadwal-mapel", verifyToken, addDataJadwalMapel);
router.get("/get-jadwal-mapel", verifyToken, getAllDataJadwalMapel);
router.get("/get-jadwal-mapel/:id", verifyToken, getDataJadwalMapelById);
router.put("/edit-jadwal-mapel/:id", verifyToken, updateDataJadwalMapel);
router.delete("/delete-jadwal-mapel/:id", verifyToken, deleteDataJadwalMapel);

module.exports = router;
