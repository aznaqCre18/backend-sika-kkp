const express = require("express");
const router = express.Router();

const guruRoute = require("./guru");
const kelasRoute = require("./kelas");
const siswaRoute = require("./siswa");
const jurusanRoute = require("./jurusan");
const generalRoute = require("./general");
const mapelRouter = require("./mapel");
const tahunAjaranRouter = require("./tahunAjaran");
const waktuMengajarRouter = require("./waktuMengajar");
const jadwalMapelRouter = require("./jadwal_mapel");
const pertemuanRouter = require("./pertemuan");
const absenRouter = require("./absen");

router.use("/guru", guruRoute);
router.use("/kelas", kelasRoute);
router.use("/siswa", siswaRoute);
router.use("/jurusan", jurusanRoute);
router.use("/general", generalRoute);
router.use("/mapel", mapelRouter);
router.use("/tahun-ajaran", tahunAjaranRouter);
router.use("/waktu-mengajar", waktuMengajarRouter);
router.use("/jadwal-mapel", jadwalMapelRouter);
router.use("/pertemuan", pertemuanRouter);
router.use("/absen", absenRouter);

module.exports = router;
