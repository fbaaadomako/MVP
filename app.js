var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// const port = 5173;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
