const models = require('../models');
const defaultMessage = require('./../utils/defaultMessage');

const addJurusan = async (req, res) => {
    const {
        kodeJurusan,
        namaJurusan
    } = req.body;

    try {
        const getAllDataJurusan = await models.jurusan.findAll({
            where: {kodeJurusan: kodeJurusan}
        });

        if(getAllDataJurusan.length > 0) {
            res.status(500).send(
                defaultMessage(500, null, 'Jurusan sudah ada')
            );
        } else {
            const jurusan = await models.jurusan.create({
                kodeJurusan,
                namaJurusan
            });
    
            res.status(200).send(
                defaultMessage(200, jurusan, "success tambah data jurusan")
            );
        }
    } catch (error) {
        res.status(500).send(
            defaultMessage(500, error, 'Gagal tambah data jurusan')
        );
    }
}

const getDataJurusan = async (req, res) => {
    try {
        const dataJurusan = await models.jurusan.findAll();
        res.status(200).send(
            defaultMessage(200, dataJurusan, 'success get all data jurusan')
        );
    } catch (error) {
        res.status(500).send(
            defaultMessage(500, error, 'failed get all data jurusan')
        );
    }
}

const editDataJurusan = async (req, res) => {
    const { kodeJurusan, namaJurusan } = req.body;
    const { id } = req.params;

    try {
        const dataJurusan = await models.jurusan.findOne({ where: {id} });

        dataJurusan.kodeJurusan = kodeJurusan;
        dataJurusan.namaJurusan = namaJurusan;

        dataJurusan.save();

        res.status(200).send(
            defaultMessage(200, dataJurusan, 'Sukses edit data jurusan')
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            defaultMessage(500, error, 'failed edit data jurusan')
        );
    }
}

const deleteDataJurusan = async (req, res) => {
    const { id } = req.params;
    try {
        const dataJurusan = await models.jurusan.findOne({where: {id}});

        dataJurusan.destroy();
        res.status(200).send(
            defaultMessage(200, null, 'Sukses hapus data jurusan')
        )
    } catch (error) {
        res.status(500).send(
            defaultMessage(500, error, 'failed delete data jurusan')
        );
    }
}

module.exports = { addJurusan, getDataJurusan, deleteDataJurusan, editDataJurusan } ;