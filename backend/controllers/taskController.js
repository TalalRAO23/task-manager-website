import Task from "../models/taskModel.js"

// GET ALL TASKS
export const getTasks = async (req, res, next) => {
    try {
        const { search, status, priority } = req.query;

        const filter = {
            user: req.user._id,
        };

        // Search
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Status filter
        if (status) {
            filter.status = status;
        }

        // Priority filter
        if (priority) {
            filter.priority = priority;
        }

        const tasks = await Task.find(filter).sort({
            createdAt: -1,
        });

        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// GET ONE TASK
export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

// CREATE TASK
export const createTask = async (req, res, next) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id,
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// UPDATE TASK
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const {
            title,
            description,
            status,
            priority,
            dueDate,
        } = req.body;

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;
        if (priority !== undefined) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;

        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// DELETE TASK
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};