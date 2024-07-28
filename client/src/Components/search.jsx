import React, { useState } from "react";
import Listtodo from "./listtodo";
import Navbar from "./navbar";

const Search = () => {
  const [description, setDescription] = useState("");

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
      console.log("Added:", data);
      setDescription("");
      window.location.reload(); // Uncomment if you want to reload the page after adding a todo
    } catch (error) {
      console.error("Error adding todo:", error);
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
        <Listtodo />
      </div>
    </>
  );
};

export default Search;
