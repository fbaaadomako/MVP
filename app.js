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
app.use(express.static(path.join(__dirname, "/Vue/dist")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Anything that doesn't match the above, send back to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname + "Vue/dist/index.html"));
});

module.exports = app;
