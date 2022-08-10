const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();

//get all messages for a chat room
// if time permits, needs to make sure user is authorized to get that information
router.get("/:chat_room", (req, res) => {
    console.log("chatid params: ", req.params.chat_room);

    knex('messages')
        .select('*')
        .where('chat_id', req.params.chat_room)
        .then((data) => {
            const dataReversed = data.reverse();
            let messagesArr = [];


            if (dataReversed.length < 10) {
                messagesArr = dataReversed;
            } else {
                for (let i = 0; i <= 10; i++) {
                    messagesArr.push(dataReversed[i])
                }
            }


            res.json(messagesArr);

        }).catch((err) => {
            // res.send(50);
            console.log(err);
        })
})

module.exports = router; 
