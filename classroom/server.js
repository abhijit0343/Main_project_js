const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use("/users", users);
app.use("/posts", posts);

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am root!");
});

// Start server
app.listen(3000, () => {
    console.log("Server is listening to 3000");
});
