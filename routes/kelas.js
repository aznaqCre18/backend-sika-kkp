const express = require('express');
const router = express.Router();

const kelasController = require('./../controllers/kelasController');
const verifyToken = require('./../middleware/verifyToken');

router.get('/get-kelas', verifyToken, kelasController.getAllDataKelas);
router.get('/get-kelas/:id', verifyToken, kelasController.getDataKelasById);
router.post('/add-kelas', verifyToken, kelasController.addKelas);
router.put('/edit-kelas/:id', verifyToken, kelasController.editDataKelas);
router.delete('/delete-kelas/:id', verifyToken, kelasController.deleteDataKelas);

module.exports = router;