const cardsRouter = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards, createCard, deleteFilm,
} = require("../controllers/movies");
const { cardValidation, cardValidationId } = require("../utils/validate");

cardsRouter.get("/movies", auth, getCards);
cardsRouter.post("/movies", auth, cardValidation, createCard);
cardsRouter.delete("/movies/_id", auth, cardValidationId, deleteFilm);

module.exports = cardsRouter;
