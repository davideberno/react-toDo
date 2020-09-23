const express = require("express");

const router = express.Router();

const User = require("./models/User");
const ToDo = require("./models/ToDo");

router.get("/all", async (req, res, next) => {
  const foundUser = await User.findOne(
    { email: req.user.email },
    (err, user) => {
      if (err) {
        next(err);
      }
      if (user) {
        return user;
      }
    }
  )
    .populate("todos")
    .exec();
  res.json(foundUser.todos);
});

router.post("/new", async (req, res) => {
  const { toDo, description, dueDate, priority, isDone } = req.body;
  const foundUser = await User.findOne(
    { email: req.user.email },
    (err, user) => {
      if (err) {
        next(err);
      }
      if (user) {
        return user;
      }
    }
  )
    .populate("todos")
    .exec();

  const newToDo = await ToDo.create({
    toDo,
    description,
    dueDate,
    priority,
    isDone,
  });
  await foundUser.todos.push(newToDo._id);
  await foundUser.save();
  res.json(newToDo);
});

router.put("/edit", async (req, res) => {
  const { _id, toDo, description, dueDate, priority, isDone } = req.body;
  const updatedToDo = await ToDo.findByIdAndUpdate(
    _id,
    { toDo, description, dueDate, priority, isDone },
    { useFindAndModify: false },
    (err, toDo) => {
      if (err) {
        next(err);
      }
      if (toDo) {
        return toDo;
      }
    }
  );
  res.json(updatedToDo);
});

router.post("/delete", async (req, res) => {
  const id = req.body._id;
  const deletedToDo = await ToDo.findOneAndDelete({ _id: id });
  res.json(deletedToDo);
});

module.exports = router;
