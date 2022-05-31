const express = require('express');
const router = express.Router();
const jurusanController = require('./../controllers/jurusanController');
const verifyToken = require('./../middleware/verifyToken');

router.get('/get-jurusan', verifyToken, jurusanController.getDataJurusan);
router.post('/add-jurusan', verifyToken, jurusanController.addJurusan);
router.put('/edit-jurusan/:id', verifyToken, jurusanController.editDataJurusan);
router.delete('/delete-jurusan/:id', verifyToken, jurusanController.deleteDataJurusan);

module.exports = router;