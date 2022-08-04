// const knex = require("knex")(require("./knexfile.js"));
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");


app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);



// all warehouses routes
app.get("/", (_req, res) => {
  res.send("hi");
})

app.post("/", (req, _res, next) => {
  const data = req.body;
})

app.listen(PORT, () => {
  console.log(`Listening on port${PORT}`);
});