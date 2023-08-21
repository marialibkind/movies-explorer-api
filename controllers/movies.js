const Movie = require("../models/movies");
const CustomError = require("../errors/customError");

const getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const {
      country, director, duration, year, description, image,
      trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const movie = await Movie.create({
      owner,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    res.status(201).send(movie);
  } catch (error) {
    if (error.name = "ValidationError") {
      const error400 = new CustomError(400, "Ошибка Валидации");
      next(error400);
    } 
      next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
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
  getMovies, createMovie, deleteMovie,
};
