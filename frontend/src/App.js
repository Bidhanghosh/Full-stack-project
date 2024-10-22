import React, { useEffect } from 'react';
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import Importanttask from './pages/Importanttask';
import Completedtask from './pages/Completedtask';
import Incompletedtask from './pages/Incompletedtasks';
import { Routes, Route, useNavigate, BrowserRouter as Router } from "react-router-dom"; // Use BrowserRouter as Router
import Signup from "./pages/Signup";
import Login from './pages/Login';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Corrected useEffect with dependencies
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }

    if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate, dispatch]); // Added 'isLoggedIn', 'navigate', and 'dispatch' as dependencies

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path="/Importanttask" element={<Importanttask />} />
            <Route path="/Completedtask" element={<Completedtask />} />
            <Route path="/Incompletedtask" element={<Incompletedtask />} />
          </Route>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
