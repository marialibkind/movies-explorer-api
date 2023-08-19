const cardsRouter = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMovies, createMovie, deleteMovie,
} = require("../controllers/movies");
const {movieValidation, movieValidationId} = require("../utils/validate");


cardsRouter.get("/movies", auth, getMovies);
cardsRouter.post("/movies", auth, movieValidation, createMovie);
cardsRouter.delete("/movies/:movieId", auth, movieValidationId, deleteMovie);

module.exports = cardsRouter;
