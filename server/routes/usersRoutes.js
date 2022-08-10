const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";

function getToken(req) {
    return req.headers.authorization.split(" ")[1];
}


//post route to create a user
router.post("/signup", (req, res) => {
    const {username, password} = req.body;
    // const hashPass = bcrypt.hashSync(password, saltRounds);

    knex("users")
        .insert({username: username, password: password})
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            // res.status(500).send("Error getting users");
        })
    res.json({ signup_success: "true" });
})

router.post("/login", (req, res) => {
    console.log(req);
    const { username, password } = req.body;
    // const user = users[username];
    

    knex("users")
        .select("*")
        .where("username", username)
        .andWhere("password", password)
        .then((data) => {
            let user = data[0];

            if (user.id) {
                console.log('Found user:', user);
                res.json({
                    token: jwt.sign({
                        username: user.username,
                        password: user.password
                    }, jsonSecretKey)
                });
            } else {
                res.json({
                    token: "",
                    error: {
                        message: "Error logging in. Invalid username/password combination.",
                    },
                });
            }
        }).catch((err) => {
            res.status(500).send("Error getting user");
        })
    // console.log(user);

    // if (user) {
    //     console.log('Found user:', user);
    //     res.json({ user: user, token: jwt.sign(user, jsonSecretKey) });
    // } else {
    //     res.json({
    //         token: "",
    //         error: {
    //             message: "Error logging in. Invalid username/password combination.",
    //         },
    //     });
    // }
});

router.get("/profile", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user_auth = jwt.decode(token);

    knex('users')
        .select('*')
        .where("username", user_auth.username)
        .andWhere("password", user_auth.password)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log('knex error retrieving user from request token')
            res.status(500).send("Error getting user");
        })
});

router.post("/preferences", (req, res) => {
    console.log(req.body);

    if (!req.body.sports_preference) {
        console.log("no sports pref in update req");
        knex('users').where('id', req.body.userId).update({
            distance_preference: req.body.distance_preference
        }).then(() => {
            res.json({ status: "success" })
        }).catch((err) => {
            res.status(500).send("Error updating user");
        })
    } else if (!req.body.distance_preference) {
        console.log("no distance pref in update req");
        knex('users').where('id', req.body.userId).update({
            sports_preference: req.body.sports_preference,
        }).then(() => {
            res.json({ status: "success" })
        }).catch((err) => {
            res.status(500).send("Error updating user");
        })

    } else if(req.body.sports_preference && req.body.distance_preference) {
        knex('users').where('id', req.body.userId).update({
            sports_preference: req.body.sports_preference,
            distance_preference: req.body.distance_preference
        }).then(() => {
            res.json({ status: "success" })
        }).catch((err) => {
            res.status(500).send("Error updating user");
        })
    }else{
        
    }


});

module.exports = router;