const express = require("express");
const router = express.Router();

const siswaController = require("./../controllers/siswaController");
const verifyToken = require("./../middleware/verifyToken");

router.get("/get-siswa", verifyToken, siswaController.getDataSiswa);
router.post("/add-siswa", verifyToken, siswaController.addSiswa);
router.put("/edit-siswa/:id", verifyToken, siswaController.editDataSiswa);
router.delete(
  "/delete-siswa/:id",
  verifyToken,
  siswaController.deleteDataSiswa
);

module.exports = router;
