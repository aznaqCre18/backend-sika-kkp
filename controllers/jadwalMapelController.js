const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addDataJadwalMapel = async (req, res) => {
  try {
    const { body } = req;

    const addJadwalMapel = await models.jadwal_mapel.create(body);

    console.log("add", addJadwalMapel.id);

    const tampilDataJadwalMapel = await models.jadwal_mapel.findOne({
      where: { id: addJadwalMapel.id },
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
    });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          tampilDataJadwalMapel,
          "success tambah data jadwal mapel"
        )
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tambah jadwal mapel"));
  }
};

exports.getAllDataJadwalMapel = async (req, res) => {
  try {
    const dataJadwalMapel = await models.jadwal_mapel.findAll({
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
              as: "guru",
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
    });

    res
      .status(200)
      .send(
        defaultMessage(200, dataJadwalMapel, "success tampil jadwal mapel")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil data jadwal mapel"));
  }
};

// get data by id
exports.getDataJadwalMapelById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkDataJadwalMapel = await models.jadwal_mapel.findOne({
      where: { id },
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
    });

    if (!checkDataJadwalMapel)
      return res
        .status(404)
        .send(
          defaultMessage(404, null, `data dengan id ${id} tidak ditemukan`)
        );

    res
      .status(200)
      .send(defaultMessage(200, checkDataJadwalMapel, "success tampil data"));
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil data jadwal mapel"));
  }
};

exports.updateDataJadwalMapel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id data if exist
    const checkDataJadwalMapel = await models.jadwal_mapel.findOne({
      where: { id },
    });

    if (!checkDataJadwalMapel)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan"));

    await models.jadwal_mapel.update(body, {
      where: { id },
    });

    const dataJadwalMapel = await models.jadwal_mapel.findOne({
      where: { id },
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
    });

    res
      .status(200)
      .send(
        defaultMessage(200, dataJadwalMapel, "success edit data jadwal mapel")
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal update data jadwal mapel"));
  }
};

exports.deleteDataJadwalMapel = async (req, res) => {
  try {
    const { id } = req.params;

    const checkJadwalMapel = await models.jadwal_mapel.findOne({
      where: { id },
    });

    await checkJadwalMapel.destroy();

    res
      .status(200)
      .send(defaultMessage(200, null, "success hapus data jadwal mapel"));
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal delete data jadwal mapel"));
  }
};
