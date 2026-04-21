import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: String,
  totalSlots: Number,
  availableSlots: Number
});

export default mongoose.model("Activity", activitySchema);