import React, { useEffect, useState } from "react";

const Listtodo = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting task with ID:", id); // Log the ID
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.todo_id !== id)
        );
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
