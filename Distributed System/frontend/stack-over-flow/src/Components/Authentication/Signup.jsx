import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowPost from "../Posts/ShowPost";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isSigned, setSigned] = useState(false);
  const [password, setPassword] = useState("");
  const [userId, setuserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        email,
        password,
      });
      setuserId(response.data.userId);
      setSigned(true);
      const id = response.data.userId;
      navigate("/post", {state: { id }} );
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          >
            Sign Up
          </button>
        </form>
        {
          isSigned && <ShowPost></ShowPost>
        }
      </div>
    </div>
  );
};

export default SignUp;
