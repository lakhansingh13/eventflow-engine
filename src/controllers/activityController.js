import Activity from "../models/Activity.js";
import redis from "../config/redis.js";
import { Worker } from "worker_threads";

export const createActivity = async (req, res) => {
  const { title, totalSlots } = req.body;

  const activity = await Activity.create({
    title,
    totalSlots,
    availableSlots: totalSlots
  });

  await redis.del("activities"); // clear cache

  res.json(activity);
};

export const getActivities = async (req, res) => {
  const cache = await redis.get("activities");

  if (cache) {
    console.log("Cache HIT ");
    return res.json(JSON.parse(cache));
  }

  console.log("Cache MISS ");

  const activities = await Activity.find();

  await redis.set("activities", JSON.stringify(activities), { EX: 60 });

  res.json(activities);
};

// JOIN API (RACE CONDITION FIX)
export const joinActivity = async (req, res) => {
  const { id } = req.params;

  const activity = await Activity.findOneAndUpdate(
    { _id: id, availableSlots: { $gt: 0 } },
    { $inc: { availableSlots: -1 } },
    { returnDocument: "after" }
  );



  if (!activity) {
    return res.status(400).send("No slots left");
  }

  

  // WebSocket emit
  global.io.emit("userJoined", { activityId: id });

  // Worker thread
  new Worker("./src/workers/pdfWorker.js", {
    workerData: { userId: "123", activityId: id }
  });

  res.send("Joined successfully");
};