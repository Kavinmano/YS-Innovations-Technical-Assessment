import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterTabs from "./components/FilterTabs";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const API_URL = "http://localhost:5000/api/tasks"; 

  const fetchTasks = async () => {
    try {
      const q = filter !== "all" ? `?status=${filter}` : "";
      const res = await axios.get(`${API_URL}${q}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleSave = async (taskData) => {
    if (editing) {
      await axios.patch(`${API_URL}/${editing._id}`, taskData);
      setEditing(null);
    } else {
      await axios.post(API_URL, taskData);
    }
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    }
  };

  const handleToggle = async (task) => {
    await axios.patch(`${API_URL}/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <TaskForm
        editing={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      <FilterTabs current={filter} onChange={setFilter} />

      <TaskList
        tasks={tasks}
        onEdit={setEditing}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
