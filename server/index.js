// const knex = require("knex")(require("./knexfile.js"));
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const http = require("http");
const { Server } = require('socket.io'); 


app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

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


server.listen(8080, () => {
  console.log("SERVER RUNNIG ON PORT 8080");
})
