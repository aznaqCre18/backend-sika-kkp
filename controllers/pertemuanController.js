const models = require("./../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addPertemuan = async (req, res) => {
  try {
    const { idJadwalMapel, pertemuan } = req.body;

    // check if pertemuan in jadwal mapel is exist
    const checkPertemuan = await models.pertemuan.findOne({
      where: { idJadwalMapel, pertemuan },
    });

    if (checkPertemuan)
      return res.status(500).send(defaultMessage(500, null, "data sudah ada"));

    const addDataPertemuan = await models.pertemuan.create(req.body);

    const newDataPertemuan = await models.pertemuan.findOne({
      where: { id: addDataPertemuan.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: models.jadwal_mapel,
        as: "jadwalMapel",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "idMapel",
            "idKelas",
            "idGuru",
            "idTahunAjaran",
            "idWaktuMengajar",
          ],
        },
        include: [
          {
            model: models.mapel,
            as: "mapel",
            attributes: ["id", "namaMapel", "kodeMapel", "kkm"],
          },
          {
            model: models.guru,
            as: "guru",
            attributes: ["nip", "nama", "email", "gelarBelakang", "gelarDepan"],
          },
          {
            model: models.waktu_mengajar,
            as: "waktuMengajar",
            attributes: ["kodeWaktuMengajar", "jamMapel", "waktuMapel"],
          },
          {
            model: models.tahun_ajaran,
            as: "tahunAjaran",
            attributes: ["thnAjaran", "semester"],
          },
          {
            model: models.kelas,
            as: "kelas",
            attributes: ["id", "kodeKelas", "namaKelas"],
            include: [
              {
                model: models.jurusan,
                as: "jurusan",
                attributes: ["id", "kodeJurusan", "namaJurusan"],
              },
              {
                model: models.guru,
                as: "waliKelas",
                attributes: [
                  "nip",
                  "nama",
                  "email",
                  "gelarBelakang",
                  "gelarDepan",
                ],
              },
            ],
          },
        ],
      },
    });

    res
      .status(200)
      .send(
        defaultMessage(200, newDataPertemuan, "success tambah data pertemuan")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tambah data pertemuan"));
  }
};

exports.getAllDataPertemuan = async (req, res) => {
  try {
    const dataAllPertemuan = await models.pertemuan.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: models.jadwal_mapel,
        as: "jadwalMapel",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "idMapel",
            "idKelas",
            "idGuru",
            "idTahunAjaran",
            "idWaktuMengajar",
          ],
        },
        include: [
          {
            model: models.mapel,
            as: "mapel",
            attributes: ["id", "namaMapel", "kodeMapel", "kkm"],
          },
          {
            model: models.guru,
            as: "guru",
            attributes: ["nip", "nama", "email", "gelarBelakang", "gelarDepan"],
          },
          {
            model: models.waktu_mengajar,
            as: "waktuMengajar",
            attributes: ["kodeWaktuMengajar", "jamMapel", "waktuMapel"],
          },
          {
            model: models.tahun_ajaran,
            as: "tahunAjaran",
            attributes: ["thnAjaran", "semester"],
          },
          {
            model: models.kelas,
            as: "kelas",
            attributes: ["id", "kodeKelas", "namaKelas"],
            include: [
              {
                model: models.jurusan,
                as: "jurusan",
                attributes: ["id", "kodeJurusan", "namaJurusan"],
              },
              {
                model: models.guru,
                as: "waliKelas",
                attributes: [
                  "nip",
                  "nama",
                  "email",
                  "gelarBelakang",
                  "gelarDepan",
                ],
              },
            ],
          },
        ],
      },
    });

    res
      .status(200)
      .send(
        defaultMessage(200, dataAllPertemuan, "success tampil data pertemuan")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil data pertemuan"));
  }
};

exports.getDataPertemuanById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIdPertemuan = await models.pertemuan.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: models.jadwal_mapel,
        as: "jadwalMapel",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "idMapel",
            "idKelas",
            "idGuru",
            "idTahunAjaran",
            "idWaktuMengajar",
          ],
        },
        include: [
          {
            model: models.mapel,
            as: "mapel",
            attributes: ["id", "namaMapel", "kodeMapel", "kkm"],
          },
          {
            model: models.guru,
            as: "guru",
            attributes: ["nip", "nama", "email", "gelarBelakang", "gelarDepan"],
          },
          {
            model: models.waktu_mengajar,
            as: "waktuMengajar",
            attributes: ["kodeWaktuMengajar", "jamMapel", "waktuMapel"],
          },
          {
            model: models.tahun_ajaran,
            as: "tahunAjaran",
            attributes: ["thnAjaran", "semester"],
          },
          {
            model: models.kelas,
            as: "kelas",
            attributes: ["id", "kodeKelas", "namaKelas"],
            include: [
              {
                model: models.jurusan,
                as: "jurusan",
                attributes: ["id", "kodeJurusan", "namaJurusan"],
              },
              {
                model: models.guru,
                as: "waliKelas",
                attributes: [
                  "nip",
                  "nama",
                  "email",
                  "gelarBelakang",
                  "gelarDepan",
                ],
              },
            ],
          },
        ],
      },
    });

    if (!checkIdPertemuan)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan"));

    res
      .status(200)
      .send(
        defaultMessage(200, checkIdPertemuan, "success tampil data pertemuan")
      );
  } catch (error) {
    res.status(500),
      send(defaultMessage(500, null, "gagal tampil data pertemuan"));
  }
};
