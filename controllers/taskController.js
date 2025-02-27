const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description = "", dueDate, priority = "medium", completed = false } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const formattedDueDate = dueDate ? new Date(dueDate) : null;

    const newTask = new Task({
      title,
      description,
      dueDate: formattedDueDate,
      priority,
      completed,
      user: req.user.id,
    });

    // Save task to database
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().select("title description dueDate priority completed");
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCurrentUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSingleTask = async (req, res) => {
  try {
    const tasks = await Task.find({ _id: req.params?.taskId });
    console.log("🚀 ~ exports.getSingleTask= ~ req.params?.id:", req.params?.taskId)
    res.status(200).json({tasks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title: req.body.title ,completed:req.body.completed}, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id });
    res.status(200).json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};