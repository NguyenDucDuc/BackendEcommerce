const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { indexRouter } = require("./routes");
const fileUpload = require("express-fileupload");
const { client } = require("./databases/redis.init");
const mongoose = require("mongoose");
const { User } = require("./models");
const { Message } = require("./schemas/message.schema");
const messageController = require("./controllers/message.controller");
require('dotenv').config()

// -- connect mongodb
mongoose
  .connect("mongodb://0.0.0.0:27017/chatdb")
  .then(() => console.log("mongodb connected"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(indexRouter);

let onlineUsers = [];


const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  socket.on('newUser', (username) => {
    addNewUser(username, socket.id);

    console.log(onlineUsers);
  });
  
  socket.on(
    "sendNotification",
    ({ senderName, receiverName, content, valueId }) => {
      console.log({ receiverName, content });
      const receiver = getUser(receiverName);
      io.to(`${receiver?.socketId}`).emit("getNotification", {
        content: content,
        valueId,
      });
    }
  );

  socket.on('sendText', ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(`${receiver?.socketId}`).emit('getText', {
      senderName,
      text,
    });
  });
  
  socket.on('logout', () => {
    removeUser(socket.id);
    console.log(onlineUsers);
  });

});

const setUpSocketRedis = async () => {
  let arrClientSocket = [];
  await client.set("sockets", JSON.stringify(arrClientSocket));
};

setUpSocketRedis();

io.on("connection", async (socket) => {
  console.log(`${socket.id} connected`);
  // -- client join room
  socket.on("clientJoinRoom", async (data) => {
    console.log(`${socket.id} join to room: ${data.conversationId}`)
    socket.join(data.conversationId)
  });

  // -- disconect
  socket.on("disconnect", async (data) => {
    let arrCientSocket = JSON.parse(await client.get("sockets"));
    if (arrCientSocket.length > 0) {
      arrCientSocket = arrCientSocket.filter(
        (item) => item.socketId !== socket.id
      );
      await client.set("sockets", JSON.stringify(arrCientSocket));
    }
  });
  // -- send message
  socket.on("clientSendMessage", async (data) => {
    socket.to(data.conversation).emit('serverSendMessage', data)
  });
});

server.listen(process.env.CONFIG_PORT, () => {
  console.log(`server running on port ${process.env.CONFIG_PORT}`);
});
