const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addAbsen = async (req, res) => {
  try {
    const { body } = req;

    const addBulkAbsen = await models.absen.bulkCreate(body);
    console.log("body", body);

    res
      .status(200)
      .send(defaultMessage(200, addBulkAbsen, "success tambah data absen"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal tambah data absen"));
  }
};

exports.getAllDataAbsen = async (req, res) => {
  try {
    const allDataAbsen = await models.absen.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "idPertemuan", "idSiswa"],
      },
      include: [
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "nis", "namaLengkap"],
          include: [
            {
              model: models.jurusan,
              as: "jurusan",
              attributes: ["kodeJurusan", "namaJurusan"],
            },
            {
              model: models.kelas,
              as: "kelas",
              attributes: ["kodeKelas", "namaKelas"],
            },
          ],
        },
        {
          model: models.pertemuan,
          as: "pertemuan",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idJadwalMapel"],
          },
          include: {
            model: models.jadwal_mapel,
            as: "jadwalMapel",
            attributes: ["id", "hari"],
            include: [
              {
                model: models.mapel,
                as: "mapel",
                attributes: ["namaMapel", "kodeMapel", "kkm"],
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
              {
                model: models.tahun_ajaran,
                as: "tahunAjaran",
                attributes: ["thnAjaran", "semester"],
              },
            ],
          },
        },
      ],
    });

    res
      .status(200)
      .send(defaultMessage(200, allDataAbsen, "success tampil data absen"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal tampil data absen"));
  }
};

exports.getDataAbsenByPertemuan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataByIdPertemuan = await models.absen.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idPertemuan", "idSiswa"],
      },
      include: [
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "nis", "namaLengkap"],
          include: [
            {
              model: models.jurusan,
              as: "jurusan",
              attributes: ["kodeJurusan", "namaJurusan"],
            },
            {
              model: models.kelas,
              as: "kelas",
              attributes: ["kodeKelas", "namaKelas"],
            },
          ],
        },
        {
          model: models.pertemuan,
          as: "pertemuan",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idJadwalMapel"],
          },
          include: {
            model: models.jadwal_mapel,
            as: "jadwalMapel",
            attributes: ["id", "hari"],
            include: [
              {
                model: models.mapel,
                as: "mapel",
                attributes: ["namaMapel", "kodeMapel", "kkm"],
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
              {
                model: models.tahun_ajaran,
                as: "tahunAjaran",
                attributes: ["thnAjaran", "semester"],
              },
            ],
          },
        },
      ],
    });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          dataByIdPertemuan,
          "success tampil data absen by pertemuan"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal tampil data absen"));
  }
};

exports.editAbsen = async (req, res) => {
  try {
    const { body } = req;

    console.log("body", body);

    const editAbsen = body.map(async (e, i) => {
      await models.absen.update(e, {
        where: {
          id: e.id,
        },
      });
    });

    res
      .status(200)
      .send(defaultMessage(200, editAbsen, "success update data absen"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal edit data absen"));
  }
};

// exports.addAbsen = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(defaultMessage(500, null, "Gagal tambah data absen"));
//   }
// };
