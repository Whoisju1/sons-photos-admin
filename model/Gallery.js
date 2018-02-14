const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    default: Date.now(),
  },
  photos: [{type: String}]
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;