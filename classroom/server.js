const express = require("express");
const path = require("path");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

// make flash messages and current user available in templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success", "User registered successfully!");
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    console.log(req.flash("success"));
    res.render("page.ejs", { name: req.session.name, msg : req.flash("success") });
});


// Start server
app.listen(3000, () => {
    console.log("Server is listening to 3000");
});
