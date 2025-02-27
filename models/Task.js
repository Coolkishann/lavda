const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, 
    description: { type: String, trim: true, default: "" }, 
    dueDate: { type: Date, default: null }, 
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    completed: { type: Boolean, default: false },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
