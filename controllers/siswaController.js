const bcrypt = require('bcryptjs');

const models = require('../models');
const defaultMessage = require('./../utils/defaultMessage');

const addSiswa = async (req, res) => {
    const {
        nis,
        nisn,
        namaLengkap,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        idJurusan,
        idKelas,
        namaWaliMurid,
        alamat,
        email,
    } = req.body;

    const hashPassword = await bcrypt.hash('123123', 10);

    try {
        const getAllSiswa = await models.siswa.findAll({
            where: { nisn }
        })
        const getAllSiswaByEmail = await models.siswa.findAll({
            where: { email }
        })

        if(getAllSiswaByEmail.length > 0) {
            res.status(500).send(
                defaultMessage(500, null, `Siswa sudah dengan email ${email} sudah ada`)
            );
        }

        if(getAllSiswa.length > 0) {
            res.status(500).send(
                defaultMessage(500, null, 'Siswa sudah ada')
            );
        } else {
            const siswa = await models.siswa.create({
                nis,
                nisn,
                namaLengkap,
                tempatLahir,
                tanggalLahir,
                jenisKelamin,
                idJurusan,
                idKelas,
                namaWaliMurid,
                alamat,
                email,
                password: hashPassword,
            })
    
            res.status(200).send(
                defaultMessage(200, siswa, "success tambah data siswa")
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(
            defaultMessage(500, error, 'Gagal tambah data siswa')
        );
    }
}

const getDataSiswa = async (req, res) => {
    try {
        const dataSiswa = await models.siswa.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            include: [
                {
                    model: models.jurusan,
                    as: 'jurusan',
                    attributes: ['kodeJurusan', 'namaJurusan'],
                }, 
                {
                    model: models.kelas,
                    as: 'kelas',
                    attributes: ['kodeKelas', 'namaKelas'],
                    include: {
                        model: models.guru,
                        as: 'guru',
                        attributes: ['nip', 'nama', 'email', 'gelarBelakang', 'gelarDepan']
                    },

                }
            ]
        });

        const siswaString = JSON.stringify(dataSiswa);
        const siswaObject = JSON.parse(siswaString);

        const siswa = siswaObject.map(item => ({
            ...item,
            namaKelas: item.kelas.namaKelas,
            namaJurusan: item.jurusan.namaJurusan
        }))

        res.status(200).send(
            defaultMessage(200, siswa, 'success get all data siswa')
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(
            defaultMessage(500, error, 'failed get all data siswa')
        )
    }
}

const editDataSiswa = async (req, res) => {
    const { id } = req.params;
    const { nis, nisn, namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, namaWaliMurid, alamat, idJurusan, idKelas } = req.body;

    try {
        const siswa = await models.siswa.findOne({
            where: { id }
        });

        if(siswa === null) {
            res.status(404).send(
                defaultMessage(404, null, 'data siswa tidak ditemukan')
            )
        }

        siswa.nis = nis;
        siswa.nisn = nisn;
        siswa.namaLengkap = namaLengkap;
        siswa.tempatLahir = tempatLahir;
        siswa.tanggalLahir = tanggalLahir;
        siswa.jenisKelamin = jenisKelamin;
        siswa.namaWaliMurid = namaWaliMurid;
        siswa.alamat = alamat;
        siswa.idJurusan = idJurusan;
        siswa.idKelas = idKelas;

        siswa.save();

        res.status(200).send(
            defaultMessage(200, null, 'success edit data siswa')
        )

    } catch (error) {
        console.log(error);
        res.status(500).send(
            defaultMessage(500, error, 'failed edit data siswa')
        )
    }
}

const deleteDataSiswa = async (req, res) => {
    const { id } = req.params;

    try {
        const siswaById = await models.siswa.findOne({
            where: { id }
        });

        if(siswaById === null) {
            res.status(404).send(
                defaultMessage(404, null, 'data siswa tidak ditemukan')
            )
        }

        siswaById.destroy();
        res.status(200).send(
            defaultMessage(200, null, 'Sukses hapus data siswa')
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(
            defaultMessage(500, error, 'failed delete data siswa')
        )
    }
}

module.exports = { addSiswa, getDataSiswa, editDataSiswa, deleteDataSiswa };