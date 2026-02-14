const express = require("express");
const users = express.Router();

// Index - users
users.get("/", (req, res) => {
    res.send("GET for users");
});

// Show - users
users.get("/:id", (req, res) => {
    res.send(`GET for user id: ${req.params.id}`);
});

// Post - users
users.post("/", (req, res) => {
    res.send("POST for users");
});

// Delete - users
users.delete("/:id", (req, res) => {
    res.send(`DELETE for user id: ${req.params.id}`);
});

module.exports = users;
