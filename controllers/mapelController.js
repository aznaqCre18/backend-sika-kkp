const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

const addMapel = async (req, res) => {
  try {
    const { namaMapel, kodeMapel, kkm } = req.body;

    //   check nama mapel yang sudah ada
    const checkNamaMapel = await models.mapel.findOne({
      where: { namaMapel },
    });

    //   check kode mapel yang sudah ada
    const checkKodeMapel = await models.mapel.findOne({
      where: { kodeMapel },
    });

    if (checkNamaMapel || checkKodeMapel)
      return res
        .status(500)
        .send(
          defaultMessage(
            500,
            null,
            "Gagal tambah data Mata Pelajaran karena sudah ada"
          )
        );

    const addDataMapel = await models.mapel.create(req.body);

    res
      .status(200)
      .send(
        defaultMessage(200, addDataMapel, "Success tambah data mata pelajaran")
      );
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal tambah data mapel"));
  }
};

const getAllDataMapel = async (req, res) => {
  try {
    const dataMapel = await models.mapel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataMapel, "Success get data mapel"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "Gagal get semua data mapel"));
  }
};

const getDataMapelById = async (req, res) => {
  try {
    const { id } = req.params;

    const dataMapel = await models.mapel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataMapel)
      return res
        .status(404)
        .send(defaultMessage(404, null, `data dengan id tersebut tidak ada`));

    res
      .status(200)
      .send(defaultMessage(200, dataMapel, `Success get data mapel ${id}`));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, `Gagal get mapel id`));
  }
};

const editDataMapel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const checkMapel = await models.mapel.findOne({
      where: { id },
    });

    if (!checkMapel)
      return res
        .status(404)
        .send(defaultMessage(404, null, `Tidak ada data dengan id ${id}`));

    await models.mapel.update(body, {
      where: { id },
    });

    const dataMapel = await models.mapel.findOne({
      where: { id },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataMapel, "Success edit data mata pelajaran"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal edit data mapel"));
  }
};

const deleteDataMapel = async (req, res) => {
  try {
    const { id } = req.params;

    const checkMapel = await models.mapel.findOne({
      where: { id },
    });

    await checkMapel.destroy();

    res
      .status(200)
      .send(defaultMessage(200, null, `Success delete data mapel id ${id}`));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal hapus data mapel"));
  }
};

module.exports = {
  getAllDataMapel,
  getDataMapelById,
  editDataMapel,
  addMapel,
  deleteDataMapel,
};
