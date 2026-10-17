const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const corsMiddleware = require('./middlewares/cors');
const routes = require("./routes");

dotenv.config();

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/library",
} = process.env;

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use("/", routes);

app.use((req, res) => {
  res.status(404).send({ message: "Такого маршрута не существует" });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send({ message: "Ошибка на стороне сервера" });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Подключение к MongoDB установлено");

    app.listen(PORT, () => {
      console.log(`Сервер запущен: ${API_URL}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Не удалось подключиться к MongoDB:", err.message);
    process.exit(1);
  });
