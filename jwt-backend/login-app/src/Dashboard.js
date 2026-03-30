//it checks if user is authorized and then show data
import React, { useEffect, useState } from "react"; // useEffect-run code when page loads
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("");//Store response from backend

  //useEffect-Runs automatically when component loads  
  useEffect(() => {
    const token = localStorage.getItem("token"); // Gets JWT token stored during login

    axios.get("http://localhost:3000/dashboard", {
      headers: { Authorization: token }// Sends request to backend
    })
    .then(res => setMessage(res.data.message))// If token is valid: Backend returns data, Message stored in state 
    .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;