const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { indexRouter } = require('./routes');
const fileUpload = require('express-fileupload');
const { client } = require('./databases/redis.init');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"]
  }
});
require('dotenv').config()

app.use(express.json())
app.use(fileUpload({useTempFiles: true}))
app.use(cors())
app.use(indexRouter)


// const testRedis = async () => {
//   const obj = [
//         {
//           id:1,
//           name: "duc duc"
//         },
//         {
//           id: 2,
//           name: "nam nam"
//         }
//   ]
//   const res = await client.json.get("test2", {id: 1})
//   console.log(res)
// }

// testRedis()



io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
});

server.listen(5000, () => {
  console.log('server is running...');
});