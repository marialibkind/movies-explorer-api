const Card = require("../models/card");
const CustomError = require("../errors/customError");

const getMovies = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId  } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(card);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const userId = req.user._id;
    if (!card) {
      throw new CustomError(404, "Карточка не найдена");
    }
    if (card.owner.toString() !== userId) {
      throw new CustomError(403, "нет прав");
    }
    await card.deleteOne();
    res.send({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
