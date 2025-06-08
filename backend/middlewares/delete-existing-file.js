const fs = require('fs');
const path = require('path');

const deleteExistingFile = (folder) => (req, res, next) => {
    const uid = req.user._id;

    const dir = path.join(__dirname, '..', 'uploads', folder);

    // Crear carpeta en caso de que no exista
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        return next();
    }

    // Reemplazar archivo con el nuevo
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err);
            next();
        }
        
        const userFile = files.find(file => file.startsWith(uid + '-'));
        if (userFile) {
            const filePath = path.join(dir, userFile);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Error al borrar el fichero');
                }
                next();
            });
        } else {
            next();
        }
    });
}

module.exports = deleteExistingFile;
