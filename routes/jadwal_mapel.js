const express = require("express");
const router = express.Router();

const {
  addDataJadwalMapel,
  getAllDataJadwalMapel,
  getDataJadwalMapelById,
  getDataJadwalMapelByIdGuru,
  getDataJadwalMapelByIdKelas,
  updateDataJadwalMapel,
  deleteDataJadwalMapel,
} = require("../controllers/jadwalMapelController");
const verifyToken = require("../middleware/verifyToken");

router.post("/add-jadwal-mapel", verifyToken, addDataJadwalMapel);
router.get("/get-jadwal-mapel", verifyToken, getAllDataJadwalMapel);

router.get("/get-jadwal-mapel/:id", verifyToken, getDataJadwalMapelById);
router.get(
  "/get-jadwal-mapel/guru/:idGuru",
  verifyToken,
  getDataJadwalMapelByIdGuru
);
router.get(
  "/get-jadwal-mapel/kelas/:idKelas",
  verifyToken,
  getDataJadwalMapelByIdKelas
);

router.put("/edit-jadwal-mapel/:id", verifyToken, updateDataJadwalMapel);
router.delete("/delete-jadwal-mapel/:id", verifyToken, deleteDataJadwalMapel);

module.exports = router;
