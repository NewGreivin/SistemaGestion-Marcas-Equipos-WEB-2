// Autor: Oscar Mario Alvarez Cruz

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'equipos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'equipo-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (JPEG, PNG, GIF, WEBP).'), false);
    }
};

const getLimiteDinamico = async () => {
    try {
        const config = await configuracionDao.getConfig();
        const mb = config?.tamano_maximo_archivos || 5;
        return mb * 1024 * 1024;
    } catch {
        return 5 * 1024 * 1024;
    }
};

export const uploadEquipoImage = {
    single: (fieldName) => async (req, res, next) => {
        const fileSize = await getLimiteDinamico();
        const upload = multer({
            storage,
            limits: { fileSize },
            fileFilter
        }).single(fieldName);
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
                const config = fileSize / (1024 * 1024);
                return res.status(400).json({
                    success: false,
                    message: `El archivo supera el tamaño máximo permitido de ${config} MB.`
                });
            }
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
            next();
        });
    }
};