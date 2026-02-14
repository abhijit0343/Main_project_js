const express = require("express");
const posts = express.Router();

// Index - posts
posts.get("/", (req, res) => {
    res.send("GET for posts");
});

// Show - posts
posts.get("/:id", (req, res) => {
    res.send(`GET for post id: ${req.params.id}`);
});

// Post - posts
posts.post("/", (req, res) => {
    res.send("POST for posts");
});

// Delete - posts
posts.delete("/:id", (req, res) => {
    res.send(`DELETE for post id: ${req.params.id}`);
});

module.exports = posts;