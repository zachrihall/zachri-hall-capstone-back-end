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

//add a chat room to a user
router.post("/add/rel", (req, res) => {

    knex('chat_rooms')
        .select("*")
        .where("chat_id", req.body.chat_id)
        .andWhere("user_id", req.body.user_id)
        .then((data) => {
            if (data[0] !== undefined) {
                console.log(`chat relation already exists for chatroom: ${req.body.chat_id} and user: ${req.body.user_id}`);
                res.json({ status: 'user and chat room relation already exists' })
            } else {
                console.log("created user_id and chat_room relation")
                knex('chat_rooms')
                    .insert(req.body)
                    .then((data) => {
                        res.json({ status: 'success' });
                    }).catch((err) => {
                        res.status(500).send("Error adding chat room to user");
                    })
            }
        }).catch((err) => {
            console.log(err);
        })
})

//add a chat room to the db
router.post("/add", (req, res) => {
    console.log(req.body)

    // knex('chat_rooms')
    //     .insert(req.body)
    //     .then((data) => {
    //         console.log("chat created: ", data)
    //     }).catch((err) => {
    //         console.log(err);
    //     })
})


module.exports = router;
