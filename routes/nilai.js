const express = require("express");
const router = express.Router();

const nilaiController = require("../controllers/nilaiController");
const verifyToken = require("../middleware/verifyToken");

router.get("/get-nilai", verifyToken, nilaiController.getAllDataNilai);
router.get("/get-nilai/:id", verifyToken, nilaiController.getDetailDataNilai);
router.get(
  "/get-nilai/siswa/:id",
  verifyToken,
  nilaiController.getNilaiByIdSiswa
);
router.get(
  "/get-nilai/kelas/:id",
  verifyToken,
  nilaiController.getDataNilaiByIdKelas
);
router.post("/add-nilai", verifyToken, nilaiController.addNilai);
router.put("/edit-nilai/:id", verifyToken, nilaiController.editDataNilai);
router.delete(
  "/delete-nilai/:id",
  verifyToken,
  nilaiController.deleteDataNilai
);

module.exports = router;
