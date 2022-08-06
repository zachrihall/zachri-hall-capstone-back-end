const knex = require("knex")(require("../knexfile.js"));
const express = require('express');
const router = express();
const jwt = require("jsonwebtoken");

const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";


// get a user by id
// router.get("/:id", (req, res) => {
//     knex('users')
//         .leftJoin("posts", "users.id", "posts.user_id")
//         .select("users.id", "users.username", "users.profile_photo", "users.distance_preference", "users.sports_preference", "users.sport", "posts.sport", "posts.notes", "posts.id")
//         .where({ "users.username": req.params.username })
//         .then((data) => {
//             let posts = [];
//             data.forEach(el => {
//                 if (el.sport !== null) {
//                     posts.push({
//                         'id': el.id,
//                         'sport': el.sport,
//                         'notes': el.notes,
//                     })
//                 }
//             })

//             res.json({
//                 id: data[0].id,
//                 username: data[0].username,
//                 sport: data[0].sport,
//                 profile_photo: data[0].profile_photo,
//                 distance_preference: data[0].distance_preference,
//                 sports_preference: data[0].sports_preference,
//                 posts: posts
//             });
//         }).catch((err) => {
//             res.status(500).send("Error getting user");
//         })
// })

function getToken(req) {
    return req.headers.authorization.split(" ")[1];
}

// router.use((req, res, next) => {
//     // Signup and login are public URLs that don't require a token
//     if (req.url === "/signup" || req.url === "/login") {
//         next();
//     } else {
//         // Format of request is BEARER <token>. Splitting on ' ' will create an
//         // array where the token is at index 1
//         const token = getToken(req);

//         if (token) {
//             if (jwt.verify(token, jsonSecretKey)) {
//                 // Decode the token to pass along to end-points that may need
//                 // access to data stored in the token.
//                 req.decode = jwt.decode(token);
//                 next();
//             } else {
//                 res.status(403).json({ error: "Not Authorized." });
//             }
//         } else {
//             res.status(403).json({ error: "No token. Unauthorized." });
//         }
//     }
// });`

//post route to create a user
router.post("/signup", (req, res) => {
    console.log(req.body);
    knex("users")
        .insert(req.body)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            // res.status(500).send("Error getting users");
        })
    res.json({ signup_success: "true" });
})

router.post("/login", (req, res) => {
    const { username } = req.body;
    // const user = users[username];

    knex("users")
        .select("*")
        .where("username", username)
        .then((data) => {
            let user = data[0];

            if (user.id) {
                console.log('Found user:', user);
                res.json({
                    info: data[0],
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
            res.json(data[0]);
        }).catch((err) => {
            console.log('knex error retrieving user from request token')
            res.status(500).send("Error getting user");
        })
})

module.exports = router;



// router.post("/", (req, res) => {
//     console.log(req.body);
//     knex("users")
//         .insert(req.body)
//         .then((res) => {
//             console.log(res);
//         }).catch((err) => {
//             res.status(500).send("Error getting users");
//         })
//     res.send("created user");
// })

// router.post("/signup", (req, res) => {
//     knex("users")
//         .insert(req.body)
//         .then((res) => {
//             console.log(res);
//         }).catch((err) => {
//             res.status(500).send("Error creating user");
//         })
//     res.json({ success: "true" });
// });