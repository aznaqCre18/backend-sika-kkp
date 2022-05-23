const express = require('express');
const router = express.Router();
const guruController = require('./../controllers/guruController');
const verifyToken = require('./../middleware/verifyToken');

router.get('/get-all-guru', verifyToken, guruController.getAllDataGuru);
router.post('/add-guru', verifyToken, guruController.addGuru);
router.put('/edit-guru/:id', verifyToken, guruController.editDataGuru);
router.delete('/delete-guru/:id', verifyToken, guruController.deleteDataGuru);

module.exports = router;