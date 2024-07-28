import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nagivate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });
      if (response.status === 200) {
        alert("Signup successfu!");
        nagivate("/login");
        // window.location.reload();
      } else {
        alert("Failed");
      }

      console.log("Name:", name, "Username:", username, "Password:", password);
    } catch (error) {}
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded mt-40">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Signup
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
