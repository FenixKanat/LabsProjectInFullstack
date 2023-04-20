const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  AlbumID: { type: String, required: true, unique: true },
  AlbumTitle: { type: String, required: true },
  Artist: { type: String, required: true },
  Year: { type: String, required: true }
}, { collection: 'Album' });

module.exports = mongoose.model("Album", AlbumSchema)