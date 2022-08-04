const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();

//get all chat rooms for a user
router.get("/user/:id", (req, res) => {
    knex
        .select("*")
        .from("chat_rooms").where("user_id", req.params.id)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting posts");
        })
});





//get post(s) by id
router.get("/:id", (req, res) => {
    knex
        .select("*")
        .from("posts")
        .where("id", req.params.id)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting post(s)");
        })
})



module.exports = router;
