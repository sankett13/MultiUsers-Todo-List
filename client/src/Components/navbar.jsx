import React from "react";

const Navbar = () => {
  const handlelogout = () => {
    const response = fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6 mr-1 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m0-8h4m4 4v8m0 0H5m14 0H5"
                  />
                </svg>
                <span className="font-bold">Home</span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/userinfo"
              className="py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              User Info
            </a>
            <a
              href="/"
              onClick={handlelogout}
              className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
