const express = require("express");
const router = express.Router();

const mapelController = require("../controllers/mapelController");

const verifyToken = require("../middleware/verifyToken");

router.get("/get-mapel", verifyToken, mapelController.getAllDataMapel);
router.get("/get-mapel/:id", verifyToken, mapelController.getDataMapelById);
router.post("/add-mapel", verifyToken, mapelController.addMapel);
router.put("/edit-mapel/:id", verifyToken, mapelController.editDataMapel);
router.delete(
  "/delete-mapel/:id",
  verifyToken,
  mapelController.deleteDataMapel
);

module.exports = router;
