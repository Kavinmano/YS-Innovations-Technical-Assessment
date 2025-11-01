import React, { useState, useEffect } from "react";

function TaskForm({ editing, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editing ? "Edit Task" : "Add Task"}</h3>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="form-buttons">
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && <button onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default TaskForm;
