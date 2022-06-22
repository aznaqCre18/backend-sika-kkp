const { send } = require("express/lib/response");
const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addWaktuMengajar = async (req, res) => {
  try {
    const { kodeWaktuMengajar } = req.body;

    // check jika kode waktu mengajar sudah ada
    const checkKodeWaktuMengajar = await models.waktu_mengajar.findOne({
      where: { kodeWaktuMengajar },
    });

    if (checkKodeWaktuMengajar)
      return res
        .status(500)
        .send(defaultMessage(500, null, "kode waktu mengajar sudah tersedia"));

    const addDataWaktuMengajar = await models.waktu_mengajar.create(req.body);

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          addDataWaktuMengajar,
          "success tambah data waktu mengajar"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tambah data waktu mengajar"));
  }
};

exports.getAllDataWaktuMengajar = async (req, res) => {
  try {
    const dataWaktuMengajar = await models.waktu_mengajar.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          dataWaktuMengajar,
          "success tampilkan data waktu mengajar"
        )
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tampil data waktu mengajar"));
  }
};

exports.updateDataWaktuMengajar = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check data if exist
    const checkDataWaktuMengajar = await models.waktu_mengajar.findOne({
      where: { id },
    });

    if (!checkDataWaktuMengajar)
      return res
        .status(404)
        .send(
          defaultMessage(404, null, `data dengan id ${id} tidak ditemukan`)
        );

    await models.waktu_mengajar.update(body, {
      where: { id },
    });

    const dataWaktuMengajar = await models.waktu_mengajar.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          dataWaktuMengajar,
          "success update data waktu mengajar"
        )
      );
  } catch (error) {
    req.status(500), send(defaultMessage(500, null, "gagal update data"));
  }
};

exports.deleteDataWaktuMengajar = async (req, res) => {
  try {
    const { id } = req.params;

    const checkDataWaktuMenagajar = await models.waktu_mengajar.findOne({
      where: { id },
    });

    await checkDataWaktuMenagajar.destroy();

    res
      .status(200)
      .send(defaultMessage(200, null, "success hapus data waktu mengajar"));
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal hapus data waktu mengajar"));
  }
};
