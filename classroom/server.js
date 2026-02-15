const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

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
