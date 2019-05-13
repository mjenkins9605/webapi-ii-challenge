const express = require("express");
const postRouter = require("./postRouter.js")
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;