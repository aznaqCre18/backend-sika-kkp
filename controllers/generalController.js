const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const models = require('./../models');
const defaultMessage = require('./../utils/defaultMessage');

const login = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        if(userType === "siswa") {
            try {
                const getSiswa = await models.siswa.findOne({ where: { email } });
                const user = await models.siswa.findOne({ 
                    where: { email },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
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
                const match = await bcrypt.compare(password, getSiswa.password);

                if(!match) {
                    res.status(501).send(
                        defaultMessage(501, "", `password yang anda masukan salah!`)
                    )
                }

                const id = user.id;
                const nis = user.nis;
                const nisn = user.nisn;
                const emailAccount = user.namaWaliMurid;
                const namaLengkap = user.namaLengkap;
                const tempatLahir = user.tempatLahir;
                const tanggalLahir = user.tanggalLahir;
                const jenisKelamin = user.jenisKelamin;
                const namaWaliMurid = user.namaWaliMurid;
                const alamat = user.alamat;
                const jurusan = user.jurusan;
                const kelas = user.kelas;

                const accessToken = jwt.sign({ id, nis, nisn, emailAccount, namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, namaWaliMurid, alamat, jurusan, kelas }, process.env.ACCESS_TOKEN_SECRET);

                const dataResponse = { user, token: accessToken }

                res.status(200).send(
                    defaultMessage(200, dataResponse, `Berhasil login!`)
                )
            } catch (error) {
                console.log(error)
                res.status(404).send(
                    defaultMessage(404, error, `siswa dengan email ${email} tidak ada`)
                )
            }
        } else if(userType === "guru") {
            try {
                const getGuru = await models.guru.findOne({ where: { email: email } });
                const user = await models.guru.findOne({ 
                    where: { email },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idJurusan', 'idKelas', 'password'],
                    },
                });
                const match = await bcrypt.compare(password, getGuru.password);

                if(!match) {
                    res.status(404).send(
                        defaultMessage(404, "", `password yang anda masukan salah!`)
                    )
                }

                const id = user.id;
                const nip = user.nip;
                const nama = user.nama;
                const emailAccount = user.email;
                const tempatLahir = user.tempatLahir;
                const tanggalLahir = user.tanggalLahir;
                const jenisKelamin = user.jenisKelamin;
                const gelarDepan = user.gelarDepan;
                const gelarBelakang = user.gelarBelakang;
                const alamat = user.alamat;
                const foto = user.foto;
                const mulaiBertugas = user.mulaiBertugas;

                const accessToken = jwt.sign({ id, nip, nama, emailAccount, tempatLahir, tanggalLahir, jenisKelamin, gelarDepan, gelarBelakang, alamat, foto, mulaiBertugas }, process.env.ACCESS_TOKEN_SECRET);

                const dataResponse = { user, token: accessToken }

                res.status(200).send(
                    defaultMessage(200, dataResponse, `Berhasil login!`)
                )
            } catch (error) {
                console.log(error);
                res.status(404).send(
                    defaultMessage(404, error, `guru dengan email ${email} tidak ada`)
                )
            }
        }
    } catch (error) {
        res.status(404).send(
            defaultMessage(404, null, "data user tidak ditemukan!")
        )
    }
}

const changePassword = async (req, res) => {
    const { idUser, userType, newPassword, confirmPassword } = req.body;

    if(newPassword != confirmPassword) {
        res.status(500).send(
            defaultMessage(500, null, "password baru dan confirm password tidak cocok!")
        )
    };

    const hashPassword = await bcrypt.hash(newPassword, 10);

    try {
        if(userType === "siswa") {
            try {
                const getSiswa = await models.siswa.findOne({ where: { id: idUser } });

                getSiswa.password = hashPassword;
                getSiswa.save();

                res.status(200).send(
                    defaultMessage(200, null, "sukses ubah password!")
                )
            } catch (error) {
                res.status(404).send(
                    defaultMessage(404, error, `siswa dengan id ${idUser} tidak ada`)
                )
            }
        } else if(userType === "guru") {
            try {
                const getGuru = await models.guru.findOne({ where: { id: idUser } });

                getGuru.password = hashPassword;
                getGuru.save();

                res.status(200).send(
                    defaultMessage(200, null, "sukses ubah password!")
                )
            } catch (error) {
                res.status(404).send(
                    defaultMessage(404, error, `guru dengan id ${idUser} tidak ada`)
                )
            }
        }
    } catch (error) {
        res.status(500).send(
            defaultMessage(500, error, "Gagal ubah password!")
        )
    }
}

module.exports = { login, changePassword };