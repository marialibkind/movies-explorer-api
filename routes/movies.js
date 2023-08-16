const cardsRouter = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMovies, createMovie, deleteMovie
} = require("../controllers/movies");


cardsRouter.get("/movies", auth, getMovies);
cardsRouter.post("/movies", auth, createMovie);
cardsRouter.delete("/movies/_id", auth,  deleteMovie);

module.exports = cardsRouter;
