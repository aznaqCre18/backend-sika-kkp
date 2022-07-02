const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.addNilai = async (req, res) => {
  try {
    const { body } = req;

    console.log(body);

    await body.map((data) => {
      models.nilai.create(data);
    });

    const tampilDataNilai = await models.nilai.findAll();

    res
      .status(200)
      .send(defaultMessage(200, tampilDataNilai, "success tambah data nilai"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "gagal tambah nilai"));
  }
};

exports.getAllDataNilai = async (req, res) => {
  try {
    const tampilDataNilai = await models.nilai.findAll();

    res
      .status(200)
      .send(defaultMessage(200, tampilDataNilai, "success tampil data nilai"));
  } catch (error) {
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
