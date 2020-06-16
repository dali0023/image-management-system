const express = require("express");
// use put and delete we need to install and connect:

// Connect Session and Flash
const session = require("express-session");
const flash = require("connect-flash");

var methodOverride = require("method-override");
const app = express();
const path = require("path");

// setting .env file
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
// file upload
var multer = require("multer");
// Connect EJS Template Engine:
app.set("view engine", "ejs");
app.set("views", "views");

//connect route with individual file
const adminRoutes = require("./routes/admin");

// convert form data
const bodyPerser = require("body-parser");
app.use(bodyPerser.urlencoded({ extended: false }));

// Connect Static Files,
app.use(express.static(path.join(__dirname, "public")));


// set root directory...
global.__basedir = __dirname;

//middleware for  method override
app.use(methodOverride("_method"));
// connect all routes files

//middleware for express session
app.use(
  session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true,
  })
);

//middleware for connect flash
app.use(flash());

//Setting messages variables globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(adminRoutes);
// app.use("/admin",shopRoutes);

// Create 404 page
const errorControllers = require("./controllers/errorController");
app.use(errorControllers);

// Connecting to Mongo DB database( Mongoose )
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`this server is running on ${port}`));
