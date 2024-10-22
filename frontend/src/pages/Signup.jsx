import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Check if the user is already logged in and redirect them
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]); // Added useEffect with dependencies

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
        return; // Early return if validation fails
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up", // Changed the endpoint
        Data
      );
      
      // Clear the form fields after successful signup
      setData({ username: "", email: "", password: "" });
      console.log(response);

      // Redirect to the login page after signup
      navigate("/login");
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>

        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />

        <input
          type="email"
          placeholder="email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={Data.email}
          onChange={change}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            SignUp
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already having an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
