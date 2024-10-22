import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Use useEffect for redirection when the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]); // Added `isLoggedIn` and `navigate` as dependencies

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
        return; // Exit early if validation fails
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/log-in",
        Data
      );

      setData({ username: "", password: "" });
      console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login()); // Dispatch login action
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>

        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
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
            Login
          </button>

          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not having an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
