const usersRouter = require("express").Router();
const {
  getUsers, createUser, setProfile, getInforCurrentUser, login, logOut,
} = require("../controllers/user");
const auth = require("../middlewares/auth");
const {
  userValidation, userUpdateValidation, userLoginValidation,
} = require("../utils/validate");

usersRouter.post("/signup", userValidation, createUser);
usersRouter.post("/signin", userLoginValidation, login);
usersRouter.get("/signout", logOut);

usersRouter.get("/users", auth, getUsers);
usersRouter.get("/users/me", auth, getInforCurrentUser);

usersRouter.patch("/users/me", auth, userUpdateValidation, setProfile);

module.exports = usersRouter;
