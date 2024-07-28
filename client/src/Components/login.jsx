import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        alert("Logged in SuccessFul");
        login();
        navigate("/home");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded mt-40">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
