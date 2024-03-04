/* eslint-disable react/prop-types */
// src/components/LoginForm.js

import { useContext } from "react";
import UserContext from "../context/userContext";
import { toast } from 'react-toastify';
import loginService from "../services/login";
import reservationService from "../services/reservation";
import { useState } from "react";

const LoginForm = () => {
  const { setUser, setLoggedIn } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    // Check if either username or password is empty
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password.');
      return;
    }

    try {
      const newUser = await loginService.signup({
        username,
        password
      })
      setUsername('')
      setPassword('')
      toast.success(`User registered: ${newUser.username}`);
    } catch (error) {
      console.log(error)
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    //  Check if either username or password is empty
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password.');
      return;
    }
    try {
      const newUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(newUser)
      )
      reservationService.setToken(newUser.token)
      setUser(newUser)
      setLoggedIn(true);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login or Register</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <button type="button" onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 mr-2">
            Register
          </button>
          <button type="button" onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
