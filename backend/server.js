const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const audioRoutes = require('./routes/audio');
const playbackRoutes = require('./routes/playback')
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://mongo:27017/audioapp', { useNewUrlParser: true, useUnifiedTopology: true });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/playback', playbackRoutes);
app.use('/api/user', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
