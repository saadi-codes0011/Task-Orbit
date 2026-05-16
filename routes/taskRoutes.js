const express = require("express");
const { createTask, getAllTasks , updateTask , deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;