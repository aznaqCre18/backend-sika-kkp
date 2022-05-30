const express = require("express");
const router = express.Router();

const {
  getAllTahunAjaran,
  addTahunAjaran,
  deleteDataTahunAjaran,
} = require("../controllers/tahunAjaranController");

const verifyToken = require("../middleware/verifyToken");

router.use("/get-all", getAllTahunAjaran);
router.use("/add-tahun", addTahunAjaran);
router.use("/delete-tahun/:id", deleteDataTahunAjaran);

module.exports = router;
