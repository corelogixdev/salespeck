const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');

function getUploadsBaseDir() {
    if (__dirname.includes('app.asar')) {
        const appDataPath = process.env.APPDATA
            || (process.platform === 'darwin'
                ? path.join(os.homedir(), 'Library', 'Application Support')
                : path.join(os.homedir(), '.config'));
        return path.join(appDataPath, 'openmenu', 'uploads');
    }

    return path.join(__dirname, '..', 'uploads');
}

// Create uploads directory if it doesn't exist
const uploadDir = path.join(getUploadsBaseDir(), 'profile-images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const userId = req.session?.user?.id || 'temp';
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${userId}-${timestamp}${ext}`);
    }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, and PNG images are allowed!'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

module.exports = upload;
