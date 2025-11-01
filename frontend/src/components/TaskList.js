import React from "react";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-info">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
              />
              <div className="task-text">
                <h4 className={task.completed ? "completed" : ""}>
                  {task.title}
                </h4>
                <p>{task.description}</p>
                <small>{new Date(task.createdAt).toLocaleString()}</small>
              </div>
            </div>
            <div className="task-actions">
              <button onClick={() => onEdit(task)}>Edit</button>
              <button className="delete" onClick={() => onDelete(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
