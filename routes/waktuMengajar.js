const express = require("express");
const router = express.Router();

const {
  addWaktuMengajar,
  getAllDataWaktuMengajar,
  updateDataWaktuMengajar,
  deleteDataWaktuMengajar,
} = require("../controllers/waktuMengajarController");

const verifyToken = require("../middleware/verifyToken");

router.post("/add-waktu-mengajar", verifyToken, addWaktuMengajar);
router.get("/get-waktu-mengajar", verifyToken, getAllDataWaktuMengajar);
router.put("/edit-waktu-mengajar/:id", verifyToken, updateDataWaktuMengajar);
router.delete(
  "/delete-waktu-mengajar/:id",
  verifyToken,
  deleteDataWaktuMengajar
);

module.exports = router;
