const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioFileSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('AudioFile', AudioFileSchema);
