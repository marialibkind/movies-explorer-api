const Movie = require("../models/card");
const CustomError = require("../errors/customError");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId  } = req.body;
    const movie = await Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId});
    res.status(201).send(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.cardId);
    const userId = req.user._id;
    if (!movie) {
      throw new CustomError(404, "Фильм не найден");
    }
    if (movie.owner.toString() !== userId) {
      throw new CustomError(403, "нет прав");
    }
    await movie.deleteOne();
    res.send({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie
};
