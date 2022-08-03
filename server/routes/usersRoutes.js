const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();

//get all users
router.get("/", (req, res) => {
    knex
        .select("*")
        .from("users")
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting users");
        })
});

//get a user by id
router.get("/:user", (req, res) => {
    knex
        .select("*")
        .from("users")
        .where("id", req.params.user)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting users");
        })
})

//post route to create a user
router.post("/", (req, res) => {
    knex("users")
        .insert(req.body)
        .catch((err) => {
            res.status(500).send("Error adding user(s)");
        })
})

module.exports = router;
