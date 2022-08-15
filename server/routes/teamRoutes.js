const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();



// get team(s) by user id
router.get("/:id", (req, res) => {
    console.log("req: ", req);

    knex('chat_name')
        .select("*")
        .from("teams")
        .where("user_id", req.params.id)
        .then((data) => {
            res.json(data);
            console.log("res: ", data[0]);
        }).catch((err) => {
            res.status(500).send("Error getting post(s)");
        })
})

//get a post(s) by chat room id
router.get("/chat/:id", (req, res) => {
    knex
        .select("*")
        .from("teams")
        .where("chat_id", req.params.id)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting post(s)");
        })
})

router.post("/", (req, res) => {
    console.log(req.body)
    knex('teams')
        .insert(req.body)
        .then((data) => {
            console.log(data);
            // res.json({ success: "true" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Error creating post");
        })
})

//get all teams
router.get("/", (req, res) => {
    knex
        .select("*")
        .from("teams")
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).send("Error getting teams");
        })
});



module.exports = router;
