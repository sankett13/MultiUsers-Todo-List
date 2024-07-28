import React from "react";

const Listtodo = ({ tasks, handleDelete }) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 border border-gray-300 rounded"
          >
            <span>{task.description}</span>
            <button
              onClick={() => handleDelete(task.todo_id)}
              className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listtodo;
