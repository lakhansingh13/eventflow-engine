import express from "express";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

// stricter limiter for join route
const joinLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many requests"
});

app.use(express.json());
app.use("/api/activity/join", joinLimiter);
app.use("/api/activity", activityRoutes);

import rateLimit from "express-rate-limit";



export default app;