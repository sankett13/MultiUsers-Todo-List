import React, { useState, useEffect } from "react";
import Listtodo from "./listtodo";
import Navbar from "./navbar";

const Search = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");

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

  const handleAddClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setTasks([...tasks, data]);
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
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
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Pern Todo</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Add a new todo"
          />
          <button
            onClick={handleAddClick}
            className="p-2 bg-green-500 w-20 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Listtodo tasks={tasks} handleDelete={handleDelete} />
        )}
      </div>
    </>
  );
};

export default Search;
