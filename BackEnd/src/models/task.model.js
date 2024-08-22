const mongoose = require("mongoose")
const { Schema } = mongoose

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique : true , 
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
