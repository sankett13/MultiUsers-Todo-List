import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-800">404</h1>
        <p className="text-2xl text-blue-800">Page Not Found</p>
        <p className="text-blue-800">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="text-blue-800">
          You will be redirected to the signup page in 5 seconds.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
