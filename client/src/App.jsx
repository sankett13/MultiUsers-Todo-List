// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/authcontext";

import "./App.css";
import Search from "./Components/search";
import Signup from "./Components/signup";
import Login from "./Components/login";
import ProtectedRoute from "./Components/protectedroutes";
import ErrorPage from "./Components/errorpage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Search />} />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
