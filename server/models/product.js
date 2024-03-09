const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  Year: { type: Number, required: true },
},{timestamps:true});

module.exports = mongoose.model('Movie', movieSchema);
