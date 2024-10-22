import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Notification/Alert";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">StackOverflow Clone</h1>
        {/* <Alert></Alert> */}
        <button onClick={handleSignOut} className="bg-red-500 py-2 px-4 rounded-lg">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
