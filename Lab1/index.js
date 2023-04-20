const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Album = require('./albumModel.js');


const app = express();

dotenv.config();

const cors = require('cors');
app.use(cors({ origin: '*' }));

mongoose.connect(process.env.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.log('Error connecting to MongoDB', error);
});

app.use(express.json()); // add this middleware to parse incoming JSON payloads

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Get all the albums in the database
app.get('/api/albums', (req, res) => {
  Album.find()
    .then((albums) => res.json(albums))
    .catch((error) => console.log(error.message));
});

//Get a specific album by ID
app.get('/api/albums/:id', (req, res) => {
  const { id } = req.params;

  Album.findOne({ AlbumID: id })
    .then((album) => {
      if (!album) {
        res.status(404).send('Album not found');
        return;
      }
      res.json(album);
    })
    .catch((error) => console.log(error.message));
});


//Create new album
app.post('/api/albums', (req, res) => {
  const { AlbumID, AlbumTitle, Artist, Year } = req.body;
  const newAlbum = new Album({ AlbumID, AlbumTitle, Artist, Year });
  newAlbum.save()
    .then((Album) => res.json(Album))
    .catch((error) => console.log(error.message));
});

//Update existing album
app.put('/api/albums/:id', (req, res) => {
  const { id } = req.params;
  const { AlbumID, AlbumTitle, Artist, Year } = req.body;

  Album.findOneAndUpdate({ AlbumID: id }, { AlbumID, AlbumTitle, Artist, Year }, { new: true })
    .then((updatedAlbum) => {
      if (!updatedAlbum) {
        res.status(404).send('Album not found');
        return;
      }
      res.json(updatedAlbum);
    })
    .catch((error) => console.log(error.message));
});

//Delete existing album
app.delete('/api/albums/:id', (req, res) => {
  const { id } = req.params;

  Album.findOneAndDelete({ AlbumID: id })
    .then((deletedAlbum) => {
      if (!deletedAlbum) {
        res.status(404).send('Album not found');
        return;
      }
      res.json(deletedAlbum);
    })
    .catch((error) => console.log(error.message));
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
