const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addNilai = async (req, res) => {
  try {
    const { body } = req;

    console.log(body);

    body.map(async (data) => {
      await models.nilai.create(data);
    });

    const tampilDataNilai = await models.nilai.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.mapel,
          as: "mapel",
          attributes: ["id", "namaMapel", "kodeMapel"],
        },
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "namaLengkap"],
        },
      ],
    });

    res
      .status(200)
      .send(defaultMessage(200, "berhasil", "success tambah data nilai"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "gagal tambah nilai"));
  }
};

exports.getAllDataNilai = async (req, res) => {
  try {
    const tampilDataNilai = await models.nilai.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.mapel,
          as: "mapel",
          attributes: ["id", "namaMapel", "kodeMapel"],
        },
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "namaLengkap"],
        },
      ],
    });

    res
      .status(200)
      .send(defaultMessage(200, tampilDataNilai, "success tampil data nilai"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "gagal tampil data nilai"));
  }
};

exports.getDetailDataNilai = async (req, res) => {
  try {
    const { id } = req.params;

    const checkDataId = await models.nilai.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.mapel,
          as: "mapel",
          attributes: ["id", "namaMapel", "kodeMapel"],
        },
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "namaLengkap"],
        },
      ],
    });

    if (!checkDataId)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan"));

    res
      .status(200)
      .send(
        defaultMessage(200, checkDataId, "success tampil detail data nilai")
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil detail data nilai"));
  }
};

// get nlai by id Siswa
exports.getNilaiByIdSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIdSiswa = await models.nilai.findOne({
      where: {
        idSiswa: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.mapel,
          as: "mapel",
          attributes: ["id", "namaMapel", "kodeMapel"],
        },
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "namaLengkap"],
        },
      ],
    });

    if (!checkIdSiswa)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data tidak ditemukan"));

    res
      .status(200)
      .send(
        defaultMessage(200, checkIdSiswa, "success tampil nilai by id siswa")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal get data nilai by siswa"));
  }
};

exports.editDataNilai = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const checkIdNilai = await models.nilai.findOne({
      where: {
        id,
      },
    });

    if (!checkIdNilai)
      return res
        .status(404)
        .send(defaultMessage(404, null, "data nilai tidak ditemukan"));

    await models.nilai.update(body, {
      where: {
        id,
      },
    });

    const tampilNilaiAfterUpdate = await models.nilai.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.mapel,
          as: "mapel",
          attributes: ["id", "namaMapel", "kodeMapel"],
        },
        {
          model: models.siswa,
          as: "siswa",
          attributes: ["id", "namaLengkap"],
        },
      ],
    });

    res
      .status(200)
      .send(
        defaultMessage(200, tampilNilaiAfterUpdate, "success update data nilai")
      );
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "gagal edit data nilai"));
  }
};

exports.deleteDataNilai = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIdNilai = await models.nilai.findOne({
      where: {
        id,
      },
    });

    await checkIdNilai.destroy({
      where: {
        id,
      },
    });

    res.status(200).send(defaultMessage(200, null, "success hapus data nilai"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "gagal hapus data nilai"));
  }
};
