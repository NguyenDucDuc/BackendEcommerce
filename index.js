const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { indexRouter } = require("./routes");
const fileUpload = require("express-fileupload");
const { client } = require("./databases/redis.init");
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

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("newUser", (username) => {
    console.log("Add new user");
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

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(`${receiver?.socketId}`).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("logout", () => {
    console.log("Logout");
    removeUser(socket.id);
    console.log(onlineUsers);
  });
});

server.listen(5000, () => {
  console.log("server is running...");
});
