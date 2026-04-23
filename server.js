import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const { connectRedis } = await import("./src/config/redis.js");

import { createServer } from "http";
import { Server } from "socket.io";

import helmet from "helmet";

// security middleware
app.use(helmet());

// create HTTP server
const server = createServer(app);

// socket setup
const io = new Server(server, {
  cors: { origin: "*" }
});

global.io = io;

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected");
});

// connect databases
connectDB();
await connectRedis();

// start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});