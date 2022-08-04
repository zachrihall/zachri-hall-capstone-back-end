const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();

//get a user by id
router.get("/:id", (req, res) => {
    knex('users')
        .leftJoin("posts", "users.id", "posts.user_id")
        .select("users.id", "users.username", "users.profile_photo", "users.distance_preference", "users.sports_preference", "users.sport", "posts.sport", "posts.notes", "posts.id")
        .where({"users.id": req.params.id})
        .then((data) => {
             let posts = [];
             data.forEach(el => {
                if(el.sport !== null) {
                    posts.push({
                        'id': el.id,
                        'sport' : el.sport,
                        'notes': el.notes,
                    })
                }
             })

            res.json({
                id: data[0].id,
                username: data[0].username,
                sport: data[0].sport,
                profile_photo: data[0].profile_photo,
                distance_preference: data[0].distance_preference,
                sports_preference: data[0].sports_preference,
                posts: posts
            });
        }).catch((err) => {
            res.status(500).send("Error getting user");
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

//get route to get a user and all their posts - should just be the get user route
router.get("/", (req, res) => {
    knex("users").join("posts", "users.id", "posts.user_id")
        .select("users.username", "users.console", "users.fav_game", "posts.game-title")
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting users");
        })
})

module.exports = router;
