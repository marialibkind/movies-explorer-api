const { Joi, celebrate } = require("celebrate");
const validator = require("valid-url");


const movieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required()
      .messages({
        "string.base": "Поле \"nameRU\" должно быть строкой",
        "string.empty": "Поле \"nameRU\" должно быть заполнено",
        "any.required": "Поле \"nameRU\" должно быть заполнено",
      }),
    nameEN: Joi.string().required()
      .messages({
        "string.base": "Поле \"nameEN\" должно быть строкой",
        "string.empty": "Поле \"nameEN\" должно быть заполнено",
        "any.required": "Поле \"nameEN\" должно быть заполнено",
      }),
    country: Joi.string().required()
      .messages({
        "string.base": "Поле \"country\" должно быть строкой",
        "string.empty": "Поле \"country\" должно быть заполнено",
        "any.required": "Поле \"country\" должно быть заполнено",
      }),
    director: Joi.string().required()
      .messages({
        "string.base": "Поле \"director\" должно быть строкой",
        "string.empty": "Поле \"director\" должно быть заполнено",
        "any.required": "Поле \"director\" должно быть заполнено",
      }),
    duration: Joi.number().required()
      .messages({
        "number.base": "Поле \"duration\" должно быть числом",
        "any.required": "Поле \"duration\" должно быть заполнено",
      }),
    year: Joi.string().required()
      .messages({
        "string.base": "Поле \"year\" должно быть строкой",
        "string.empty": "Поле \"year\" должно быть заполнено",
        "any.required": "Поле \"year\" должно быть заполнено",
      }),
    description: Joi.string().required()
      .messages({
        "string.base": "Поле \"description\" должно быть строкой",
        "string.empty": "Поле \"description\" должно быть заполнено",
        "any.required": "Поле \"description\" должно быть заполнено",
      }),
    image: Joi.string().required().custom((value, helper) => {
        if (!validator.isWebUri(value)) {
          return helper.error("это не url");
        }
        return value;
      }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!validator.isWebUri(value)) {
        return helper.error("это не url");
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!validator.isWebUri(value)) {
        return helper.error("это не url");
      }
      return value;
    }),
    movieId: Joi.number().required()
      .messages({
        "number.base": "Поле \"movieId\" должно быть числом",
        "any.required": "Поле \"movieId\" должно быть заполнено",
      }),
  }),
});

const movieValidationId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});


const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  movieValidation,
  movieValidationId,
  userValidation,
  userUpdateValidation,
  userLoginValidation,
  userIdValidation,
};
