const express = require("express");
const router = express.Router();

const guruRoute = require("./guru");
const kelasRoute = require("./kelas");
const siswaRoute = require("./siswa");
const jurusanRoute = require("./jurusan");
const generalRoute = require("./general");
const mapelRouter = require("./mapel");
const tahunAjaranRouter = require("./tahunAjaran");

router.use("/guru", guruRoute);
router.use("/kelas", kelasRoute);
router.use("/siswa", siswaRoute);
router.use("/jurusan", jurusanRoute);
router.use("/general", generalRoute);
router.use("/mapel", mapelRouter);
router.use("/tahun-ajaran", tahunAjaranRouter);

module.exports = router;
