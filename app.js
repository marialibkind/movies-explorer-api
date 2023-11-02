require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/loger");

const { DEV_DB, PROD_DB, NODE_ENV } = process.env;

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect(NODE_ENV === "production" ? PROD_DB : DEV_DB, { family: 4 });

app.use(requestLogger);
app.use(cors({
  origin: "https://diploma-marialibkind.nomoredomainsrocks.ru",
  //  origin: "http://localhost:3001",
  credentials: true,
}));
app.use(cookieParser());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервис запущен. Вы в безопасности. Порт: ${PORT}`);
});
