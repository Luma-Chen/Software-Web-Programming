var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");
var passport = require("passport");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");
var bookingsRouter = require("./routes/bookings");
var sellersRouter = require("./routes/sellers");
var userRouter = require("./routes/user");

var app = express();
dotenv.config();
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

//TODO Verificar dados no backend se for possivel

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingsRouter);
app.use("/sellers", sellersRouter);

module.exports = app;
