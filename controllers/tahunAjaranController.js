const models = require("../models");
const defaultMessage = require("../utils/defaultMessage");

exports.getAllTahunAjaran = async (req, res) => {
  try {
    const dataTahunAjaran = await models.tahun_ajaran.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send(defaultMessage(200, dataTahunAjaran, "Success"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(defaultMessage(500, null, "Gagal tampil data tahun ajaran"));
  }
};

exports.addTahunAjaran = async (req, res) => {
  try {
    const { thnAjaran, semester } = req.body;

    // check jika tahun ajaran dan semester sudah ada
    const checkTahunAjaran = await models.tahun_ajaran.findOne({
      where: { thnAjaran },
    });

    const checkSemester = await models.tahun_ajaran.findOne({
      where: { semester },
    });

    if (checkTahunAjaran && checkSemester)
      return res.status(500).send(defaultMessage(500, null, "data sudah ada"));

    const addDataTahunAjaran = await models.tahun_ajaran.create(req.body);

    res
      .status(200)
      .send(
        defaultMessage(
          200,
          addDataTahunAjaran,
          "success tambah data tahun ajaran"
        )
      );
  } catch (error) {
    res
      .status(500)
      .send(defaultMessage(500, null, "gagal tambah data tahun ajaran"));
  }
};

exports.deleteDataTahunAjaran = async (req, res) => {
  try {
    const { id } = req.params;

    const checkTahunAjaran = await models.tahun_ajaran.findOne({
      where: { id },
    });

    if (!checkTahunAjaran)
      return res
        .status(404)
        .send(defaultMessage(404, null, `data dengan id ${id} tidak ada`));

    await checkTahunAjaran.destroy();

    res
      .status(200)
      .send(
        defaultMessage(200, null, `success hapus data tahun ajaran id ${id}`)
      );
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "gagal hapus data"));
  }
};
