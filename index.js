const express = require("express");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/ErrorControllers");

const router = require("./routes");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server jalan di port : ${PORT}`);
});
