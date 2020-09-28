const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToDo = require("./ToDo");

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    todos: [{ type: Schema.Types.ObjectId, ref: "ToDo" }],
    faceBookId: String,
    googleId: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
