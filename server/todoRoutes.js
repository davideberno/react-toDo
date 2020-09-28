const express = require("express");

const router = express.Router();

const User = require("./models/User");
const ToDo = require("./models/ToDo");

router.get("/all", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.user._id })
      .populate("todos")
      .exec();
    res.json(foundUser.todos);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  const { toDo, description, dueDate, priority, isDone } = req.body;
  try {
    const foundUser = await User.findOne({ _id: req.user._id })
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
  } catch (err) {
    next(err);
  }
});

router.put("/edit", async (req, res, next) => {
  const { _id, toDo, description, dueDate, priority, isDone } = req.body;
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(
      _id,
      { toDo, description, dueDate, priority, isDone },
      { useFindAndModify: false, new: true }
    );
    res.json(updatedToDo);
  } catch (err) {
    next(err);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const deletedToDo = await ToDo.findOneAndDelete({ _id: req.body._id });
    res.json(deletedToDo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
