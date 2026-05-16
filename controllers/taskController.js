const Task = require("../modals/Task");
const ActivityLog = require("../modals/ActivityLog");
const logActivity = async (action, taskTitle, user) => {
  try {
    await ActivityLog.create({
      action,
      taskTitle,
      user,
    });
  } catch (err) {
    console.error("Activity Log Error:", err);
  }
};
const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({
        message: "Title and deadline are required",
      });
    }

    const newTask = new Task({
      title,
      description,
      deadline: new Date(deadline),
      userId: req.user.id,
    });

    const savedTask = await newTask.save();

    await logActivity(
      "created",
      savedTask.title,
      req.user.FirstName || "Unknown User"
    );

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(
      "updated",
      updatedTask.title,
      req.user.FirstName || "Unknown User"
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(
      "deleted",
      deletedTask.title,
      req.user.FirstName || "Unknown User"
    );

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const clearLogs = async (req, res) => {
  try {
    await ActivityLog.deleteMany({});

    res.status(200).json({
      message: "Activity history cleared",
    });
  } catch (error) {
    console.error("Clear Logs Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  clearLogs,
};