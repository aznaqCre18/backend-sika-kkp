const models = require("./../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addDataJadwalMapel = async (req, res) => {
  try {
    const { body } = req;

    console.log(body);

    body.map(async (data, idx) => {
      await models.jadwal_mapel.create(data);
    })

    // const addJadwalMapel = await models.jadwal_mapel.create(body);

    // console.log("add", addJadwalMapel.id);

    // const tampilDataJadwalMapel = await models.jadwal_mapel.findAll({
    //   attributes: {
    //     exclude: [
    //       "createdAt",
    //       "updatedAt",
    //       "idMapel",
    //       "idKelas",
    //       "idGuru",
    //       "idTahunAjaran",
    //       "idWaktuMengajar",
    //     ],
    //   },
    //   include: [
    //     {
    //       model: models.mapel,
    //       as: "mapel",
    //       attributes: ["id", "namaMapel", "kodeMapel", "kkm"],
    //     },
    //     {
    //       model: models.guru,
    //       as: "guru",
    //       attributes: ["nip", "nama", "email", "gelarBelakang", "gelarDepan"],
    //     },
    //     {
    //       model: models.waktu_mengajar,
    //       as: "waktuMengajar",
    //       attributes: ["kodeWaktuMengajar", "jamMapel", "waktuMapel"],
    //     },
    //     {
    //       model: models.tahun_ajaran,
    //       as: "tahunAjaran",
    //       attributes: ["thnAjaran", "semester"],
    //     },
    //     {
    //       model: models.kelas,
    //       as: "kelas",
    //       attributes: ["id", "kodeKelas", "namaKelas"],
    //       include: [
    //         {
    //           model: models.jurusan,
    //           as: "jurusan",
    //           attributes: ["id", "kodeJurusan", "namaJurusan"],
    //         },
    //         {
    //           model: models.guru,
    //           as: "guru",
    //           attributes: [
    //             "nip",
    //             "nama",
    //             "email",
    //             "gelarBelakang",
    //             "gelarDepan",
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          null,
          "success tambah data jadwal mapel"
        )
      );
  } catch (error) {
    console.log(error);
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

// get data by guru & hari
exports.getDataJadwalMapelByIdGuru = async (req, res) => {
  try {
    const { idGuru } = req.params;
    const { hari } = req.query;

    const checkIdGuru = await models.guru.findOne({ where: { id: idGuru } });

    if (!checkIdGuru)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan!"));

    let datajadwalMapelByIdGuru;

    if (hari) {
      datajadwalMapelByIdGuru = await models.jadwal_mapel.findOne({
        where: { idGuru, hari },
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
    } else {
      datajadwalMapelByIdGuru = await models.jadwal_mapel.findOne({
        where: { idGuru },
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
    }

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          datajadwalMapelByIdGuru,
          "success tampil jadwal mapel by id guru"
        )
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil jadwal mapel by id guru"));
  }
};

// get data jdawal mapel by kelas & hari
exports.getDataJadwalMapelByIdKelas = async (req, res) => {
  try {
    const { hari } = req.query;
    const { idKelas } = req.params;

    const checkIdKelas = await models.kelas.findOne({
      where: { id: idKelas },
    });

    if (!checkIdKelas)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan"));

    let dataJadwalMapelByIdKelas;

    if (hari) {
      dataJadwalMapelByIdKelas = await models.jadwal_mapel.findOne({
        where: { idKelas, hari },
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
    } else {
      dataJadwalMapelByIdKelas = await models.jadwal_mapel.findAll({
        where: { idKelas },
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
    }

    let arrTemp = [];

    dataJadwalMapelByIdKelas.map((data) => {
      if (arrTemp.length < 1) {
        arrTemp = [
          {
            hari: data.hari,
            mapel: [
              {
                id: data.id,
                jam: data.waktuMengajar.jamMapel,
                waktu: data.waktuMengajar.waktuMapel,
                mataPelajaran: data.mapel.namaMapel,
                guru: data.guru.nama,
              }
            ]
          }
        ];
      } else {
        for (let i = 0; i < arrTemp.length; i++) {
          const findSome = arrTemp.findIndex((dataFind) => {
            if (dataFind.hari === data.hari) {
              return true;
            } else {
              return false;
            }
          });

          if (findSome !== -1) {
            arrTemp[findSome].mapel = [
              ...arrTemp[findSome].mapel,
              {
                id: data.id,
                jam: data.waktuMengajar.jamMapel,
                waktu: data.waktuMengajar.waktuMapel,
                mataPelajaran: data.mapel.namaMapel,
                guru: data.guru.nama,
              }
            ];
            break;
          } else if (findSome === -1) {
            arrTemp = [
              ...arrTemp,
              {
                hari: data.hari,
                mapel: [
                  {
                    id: data.id,
                    jam: data.waktuMengajar.jamMapel,
                    waktu: data.waktuMengajar.waktuMapel,
                    mataPelajaran: data.mapel.namaMapel,
                    guru: data.guru.nama,
                  }
                ]
              }
            ];

            break;
          }
        }
      }
      return arrTemp;
    });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          arrTemp,
          "success get data jadwal mapel by idkelas"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        defaultMessage(500, null, "gagal tampil data jadwal mapel by kelas")
      );
  }
};

exports.getDatajadwalMapelGuruByHari = async (req, res) => {
  try {
    const { hari } = req.query;
    const { idGuru } = req.params;

    console.log(req.query);
    res.status(200).send(defaultMessage(200, hari, "success tampil data"));
  } catch (error) {
    console.log(error);
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
