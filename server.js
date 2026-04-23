import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
const { connectRedis } = await import("./src/config/redis.js");

import { createServer } from "http";
import { Server } from "socket.io";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
console.log("ENV TEST:", process.env.REDIS_URL);
// Security headers
app.use(helmet());

// General API rate limiter (100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api/", apiLimiter);




// Create HTTP server and attach Socket.IO
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

global.io = io;

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected");
});

// Connect DB and Redis
connectDB();
await connectRedis();

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});