const Project = require("../modals/Project");

const createProject = async (req, res) => {
    try {
        const { name, deadline } = req.body;

        if (!name || !deadline) {
            return res.status(400).json({
                message: "Name and deadline are required",
            });
        }

        const newProject = new Project({
            name,
            deadline,
            userId: req.user.id,
        });

        const savedProject = await newProject.save();

        res.status(201).json(savedProject);

    } catch (error) {
        console.error("Create Project Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Project.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            {
                name: req.body.name,
                status: req.body.status,
                progress: req.body.progress,
            },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};