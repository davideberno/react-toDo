const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
  {
    toDo: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: Date,
    priority: String,
    isDone: Boolean,
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
