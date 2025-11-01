import Task from '../models/Task.js';


// GET /api/tasks
export const getTasks = async (req, res) => {
try {
const tasks = await Task.find().sort({ createdAt: -1 });
res.status(200).json(tasks);
} catch (error) {
res.status(500).json({ message: 'Failed to fetch tasks' });
}
};


// POST /api/tasks 
export const createTask = async (req, res) => {
try {
const { title, description } = req.body;
if (!title) return res.status(400).json({ message: 'Title is required' });


const newTask = await Task.create({ title, description });
res.status(201).json(newTask);
} catch (error) {
res.status(500).json({ message: 'Failed to create task' });
}
};


// PATCH /api/tasks/:id 
export const updateTask = async (req, res) => {
try {
const { id } = req.params;
const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
if (!updatedTask) return res.status(404).json({ message: 'Task not found' });


res.status(200).json(updatedTask);
} catch (error) {
res.status(500).json({ message: 'Failed to update task' });
}
};


// DELETE /api/tasks/:id 
export const deleteTask = async (req, res) => {
try {
const { id } = req.params;
const deletedTask = await Task.findByIdAndDelete(id);
if (!deletedTask) return res.status(404).json({ message: 'Task not found' });


res.status(204).end();
} catch (error) {
res.status(500).json({ message: 'Failed to delete task' });
}
};