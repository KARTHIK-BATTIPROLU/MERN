import React, { useState } from "react";
import axios from "axios"; // Axios is a JavaScript library used to make HTTP requests from frontend to backend.

function Login() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", data);

      localStorage.setItem("token", res.data.token);
      alert("Login Success, Token : " + res.data.token);
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
