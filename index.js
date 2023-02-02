const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { indexRouter } = require('./routes');
const io = new Server(server);
require('dotenv').config()

app.use(express.json())
app.use(indexRouter)


io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
});

server.listen(5000, () => {
  console.log('server is running...');
});