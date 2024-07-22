// backend/routes/audio.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Uploads directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name generation
  }
});


// Initialize multer instance with storage configuration
const upload = multer({ storage: storage });

// Example in-memory storage for files
let files = [];

// POST endpoint to upload files
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  const { description, category } = req.body;
  const newFile = { filename: req.file.filename, description, category, username: req.user.username };
  files.push(newFile);

  res.status(201).json({ message: 'File uploaded successfully' });
});

// GET endpoint to fetch all files
router.get('/files', authMiddleware, (req, res) => {
  const userFiles = files.filter(file => file.username === req.user.username);
  res.json(userFiles);
});

module.exports = router;
