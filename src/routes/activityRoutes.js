import express from "express";
import {
  createActivity,
  getActivities,
  joinActivity
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.post("/join/:id", joinActivity);


export default router;