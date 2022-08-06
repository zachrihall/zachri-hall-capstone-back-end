// const knex = require("knex")(require("./knexfile.js"));
const express = require('express');
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require('socket.io'); 
const PORT = process.env.PORT || 8080;

const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");

app.use(cors());
app.use(express.json());

// ----- socket io stuff ------

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        // socket.broadcast.emit("receive_message", data);
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("join_room", (data) => {
        socket.join(data);
    })

})

// ------------------------


// NOTE: Secret Keys should NEVER be included in source code. Better kept in
// environment variables provided on deployment. For demo purposes only.

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/chatrooms", chatRoomRoutes);


const users = {};

app.post("/signup", (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password           // library like bcrypt to Hash the password.=
  };
  console.log('Users Object:', users);
  res.json({ success: "true" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    console.log('Found user:', user);
    res.json({ token: jwt.sign({ name: user.name }, jsonSecretKey) });
  } else {
    res.json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      },
    });
  }
});

app.get("/profile", (req, res) => {
  res.json(req.decode);
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.listen(8081);