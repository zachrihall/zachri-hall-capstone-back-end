const knex = require("knex")(require("./knexfile.js"));
const express = require('express');
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8080;

const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");
const messageRoutes = require('./routes/messagesRoutes');

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/chats", chatRoomRoutes);
app.use("/messages", messageRoutes);

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

// ----- socket io stuff ------

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.leave(socket.id);
  console.log("user connected: ", socket.id);

  socket.on("send_message", (data) => {
    // console.log("received data room: ", data.chatId)
    // // socket.broadcast.emit("receive_message", data.message);

    const messageObj = {
      user_id: data.userId,
      username: data.userName ,
      chat_id: data.chatId,
      message: data.message
    }

    console.log(messageObj);

    io.to(data.chatId).emit("receive_message", messageObj);
    // console.log("data log: ", data);
    console.log(`user: ${data.userId} or ${data.username} sent: ${data.message} to: ${data.chatId}`);



    knex('messages')
      .insert(messageObj)
      .then((res) => {
        console.log("successfully added message to database");
      }).catch((err) => {
        console.log("Error inserting message to message table: ", err)
      })

    // console.log(socket.rooms)
  })


  socket.on("join_room", (data) => {
    let loggedIn = [];
    // loggedIn.push(data.userId);

    if (loggedIn.includes(data.userId)) {
      console.log("user already joined")
    } else {
      loggedIn.push(data.userId);
    }

    let exist = true;


    knex('chat_rooms')
      .select('*')
      .where('user_id', data.userId)
      .andWhere('chat_id', data.room).then((res) => {
        if (!res[0]) {
          console.log("empty array relation does not exist");
          exist = false;
        } else {
          console.log(`relation between ${data.userId} and room ${data.room} alread exists`)
        }
      }).catch((err) => {
        console.log(err);
      })

    if (!exist) {
      let chat_name;
      console.log("exist: ", exist)

      //get the name for the chat room using the req chat.id
      knex('posts').select('*').where('chat_id', data.room)
        .then((res) => {
          chat_name = res[0].notes
        }).catch((err) => {
          console.log(err);
        });

      const newChatRel = {
        user_id: data.userId,
        chat_id: data.room,
        chat_name: "test"
      }


      //inserts the new chat relation into the database
      knex('chat_rooms')
        .insert(newChatRel).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
    } else {
      console.log(`relation between ${data.userId} and room ${data.room} already exists`)
    }

    socket.rooms.clear();

    // console.log("data packet", data);

    socket.join(data.room);
    console.log(data);
    console.log(`UserId ${data.userId} joined room: ${data.room}`)
    console.log(socket.rooms)
  })

  socket.on("leave_room", (data) => {
    console.log("before leaving - these are the rooms", socket.rooms);
    socket.rooms.clear();
    socket.emit("left_room");
    console.log("left room");
    console.log("after leaving - these are the rooms", socket.rooms);

  })




})

// ------------------------


// NOTE: Secret Keys should NEVER be included in source code. Better kept in
// environment variables provided on deployment. For demo purposes only.

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

