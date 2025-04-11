if (process.env.NODE_ENV != "production"){
require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utility/ExpressError.js"); 
const session = require("express-session"); // requiring express-session
const MongoStore = require('connect-mongo'); //connecting mongo
const flash = require("connect-flash");// requiring flash
const passport = require("passport"); // requiring passport
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



//setting up connection
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});  

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine" ,"ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//creating mongo session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24* 3600,
})

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

//creating express session
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    savaUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60* 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


// app.get("/", (req,res) => {
//     res.send("Hi, I am root") 
// });



app.use(session(sessionOptions));
app.use(flash());

//setting up configuration
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error"); 
    res.locals.currUser = req.user;
    console.log(res.locals.success);
    next();
});

app.use("/listings", listingRouter );
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/", userRouter);


//standard error for all
app.all("*", (req, res, next) => {
    next(new ExpressError(404,"Page Not Found!"));
});

//middleware for error handling
app.use((err, req , res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status (statusCode).render("error.ejs", { message });
});

<<<<<<< HEAD
=======
app.get("/",  (req, res) => {
    res.redirect("/listings")
});
>>>>>>> 25e90a4 (add project files)

app.listen(8080, () =>{
    console.log("server is listening to 8080");
});

