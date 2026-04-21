import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { connectRedis } from "./src/config/redis.js";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

global.io = io;

connectDB();
await connectRedis();

io.on("connection", (socket) => {
  console.log("Client connected");
});
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});