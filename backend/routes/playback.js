const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Example directory where audio files are stored
const audioDirectory = path.join(__dirname, '../uploads');

// GET endpoint to stream audio file
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(audioDirectory, filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      console.error('Error accessing file', err);
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the appropriate headers
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Prepare headers for partial content (streaming)
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg', // Adjust content type as per your audio file type
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Send the whole file if no range is provided
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg', // Adjust content type as per your audio file type
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

module.exports = router;