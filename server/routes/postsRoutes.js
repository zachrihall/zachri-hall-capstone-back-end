const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();

//get all posts
router.get("/", (req, res) => {
    knex
        .select("*")
        .from("posts")
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting posts");
        })
});

//get post(s) by user id
router.get("/:id", (req, res) => {
    knex
        .select("*")
        .from("posts")
        .where("user_id", req.params.id)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting post(s)");
        })
})

router.post("/", (req, res) => {
    knex('posts')
        .insert(req.body)
        .then((data) => {
            console.log(data);
            // res.json({ success: "true" });
        }).catch((err) => {
            res.status(500).send("Error creating post");
        })
})



module.exports = router;
