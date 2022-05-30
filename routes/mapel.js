const express = require("express");
const router = express.Router();

const mapelController = require("../controllers/mapelController");

const verifyToken = require("../middleware/verifyToken");

router.get("/get-mapel", mapelController.getAllDataMapel);
router.get("/get-mapel/:id", mapelController.getDataMapelById);
router.post("/add-mapel", mapelController.addMapel);
router.put("/edit-mapel/:id", mapelController.editDataMapel);
router.delete("/delete-mapel/:id", mapelController.deleteDataMapel);

module.exports = router;
