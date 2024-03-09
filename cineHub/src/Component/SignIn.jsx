import React, { useState } from "react";
import popcornImage from "../assets/boy2.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Url.js';
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signInData = { username,email, password };
    try {
      const response = await axios.post(`${baseUrl}/signup`, signInData);
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error, please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen sm:h-[660px] bg-[#070F2B] overflow-hidden">
      <div className="bg-white p-2 mx-4 sm:p-8 rounded-lg shadow-lg flex flex-col items-center gap-5 w-full max-w-md">
        <img className="w-24 mb-4" src={popcornImage} alt="Popcorn" />
        <h1 className="text-3xl font-bold text-gray-800">Welcome to KidFlix!</h1>
        <p className="text-gray-600 text-center">
          Sign in to explore a world of fun and exciting movies for kids.
        </p>
        <form className="flex flex-col gap-2 w-full">
          <label className="text-gray-800">Username:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <label className="text-gray-800">Email:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
          />
          <label className="text-gray-800">Password:</label>
          <input
            type="password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
            onClick={handleSignIn}
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600">
          Back to Login?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Here 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
