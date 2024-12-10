const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDirectory = 'uploads';
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            // Create a dynamic upload path based on user ID (or default if not provided)
            const userUploadsPath = path.join(uploadsDirectory, req.user?.id || 'default');
            if (!fs.existsSync(userUploadsPath)) {
                fs.mkdirSync(userUploadsPath, { recursive: true });
            }
            cb(null, userUploadsPath); // Set the upload directory
        } catch (error) {
            console.error('Error creating upload directory:', error.message);
            cb(new Error('Failed to create upload directory'), null);
        }
    },
    filename: (req, file, cb) => {
        // Generate a safe and unique file name
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_'); // Replace special characters with "_"
        cb(null, `${timestamp}-${safeName}`);
    },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Check MIME type and file extension
    if (!allowedTypes.includes(file.mimetype) || !['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
        const error = new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
        error.code = 'LIMIT_FILE_TYPES';
        return cb(error, false);
    }
    cb(null, true); // File is valid
};

// Configure Multer upload with limits and custom settings
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
});

// Middleware for handling single or multiple file uploads
const uploadMultiple = (fieldName = 'images', maxCount = 5) => {
    if (!fieldName) {
        throw new Error('Field name is required for uploadMultiple middleware.');
    }
    return upload.array(fieldName, maxCount);
};

// Centralized error handler middleware for upload-related errors
const handleError = (err, req, res, next) => {
    if (err) {
        console.error('Upload Error:', err.message); // Log the error for debugging

        // Handle specific Multer errors
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size is too large. Max limit is 5MB.' });
        }
        if (err.code === 'LIMIT_FILE_TYPES') {
            return res.status(400).json({ message: 'Invalid file type. Only JPG, JPEG, and PNG files are allowed.' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Too many files uploaded. Max limit is 5 files.' });
        }

        // Handle general errors
        return res.status(500).json({ message: 'File upload error', details: err.message });
    }
    next();
};

// Exporting upload middleware and error handler
module.exports = { upload, uploadMultiple, handleError };
