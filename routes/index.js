const router = require("express").Router();

const cardsRouter = require("./movies");
const usersRouter = require("./users");
const auth = require("../middlewares/auth");

const CustomError = require("../errors/customError");

router.use(cardsRouter);
router.use(usersRouter);

router.use(auth, (req, res, next) => {
  next(new CustomError(404, "Запрашиваемый ресурс не найден"));
});

module.exports = router;
