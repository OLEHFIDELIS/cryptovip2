const express = require("express");
require('dotenv').config()
// const {initializeDB} = require("./app/database/init.js");
const session = require("express-session")
const app = express();
const path = require("path");
const flash = require("connect-flash")
const pageroutes = require("./app/routes/index.js")
const users = require("./app/routes/user.js");
const ExpressError = require("./app/utills/ExpresError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose")
const  User  = require('./app/models/user.models');
const { connect } = require("http2");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));

let dblink = "mongodb+srv://oleh:360940@nodetuts.zfvbxj8.mongodb.net/cryptovip?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dblink)
.then((result) => console.log("Conected to DB Successfully"))
.catch((err) => console.log(err));

// Express session middleware
const seesionConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(seesionConfig));
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash("success");
    res.locals.error   = req.flash("error")
    next()
})

// ROUTES

app.use("/", pageroutes);
app.use("/:userId",users);

app.all("*", (req, res, next)=> {
    next(new ExpressError("Page Not Found!!", 404))
});

app.use((err, req, res, next)=> {
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh No, Somthing Went Wrong!"
    res.status(statusCode).render("pages/404", {err})
})

app.listen(5000, async()=> {
    // await initializeDB();
    console.log("listing on port 5000");
});