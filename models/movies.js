const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректные данные",
    },
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  description: {
    type: String,
    default: Date.now,
  },

  image: {
    type: String,
    default: Date.now,
  },

  trailerLink: {
    type: String,
    default: Date.now,
  },

  thumbnail: {
    type: String,
    default: Date.now,
  },

  owner: {
    type: String,
  },

  movieId: {
    type: Number,
  },

  nameRU: {
    type: String,

  },

  nameEN: {
    type: String,

  },
});

module.exports = mongoose.model("movie", movieSchema);
