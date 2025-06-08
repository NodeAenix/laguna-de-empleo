const { Router } = require('express');
const upload = require('../middlewares/file-upload');
const { uploadPdf, uploadImg } = require('../controllers/pdf.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const Alumno = require('../models/alumno');
const deleteExistingFile = require('../middlewares/delete-existing-file');

const router = Router();

router.post('/subir-pdf', [
    validateJWT(Alumno),
    deleteExistingFile('cv'),
    upload.single('pdfFile')
], uploadPdf);

router.post('/subir-img', [
    validateJWT(null),
    deleteExistingFile('img'),
    upload.single('imgFile')
], uploadImg);

module.exports = router;
