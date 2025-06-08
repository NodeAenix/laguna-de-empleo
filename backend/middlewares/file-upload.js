const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if (file.mimetype === 'application/pdf') {
            folder = 'cv'
        } else if (file.mimetype.startsWith('image/')) {
            folder = 'img'
        } else {
            return cb(new Error('Tipo de archivo no soportado'), false);
        }

        const uploadPath = path.join(__dirname, '..', 'uploads', folder);
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uid = req.user._id;
        const originalName = file.originalname.replace(/\s+/g, '-'); // reemplazar espacios con guiones
        cb(null, `${uid}-${originalName}`);
    }
});

// Filtro de archivo: PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos PDF'), false);
    }
}

// Middleware the subida
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // límite de 5MB
    fileFilter
});

module.exports = upload;
