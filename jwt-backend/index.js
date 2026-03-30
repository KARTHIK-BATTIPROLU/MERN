const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // allows frontend (React) to connect backend
const app = express();
app.use(express.json()); // converts request body (JSON) into JS object
app.use(cors()); // allows cross-origin requests (React → Node)
const SECRET_KEY = "mysecretkey";   //Use to Sign and verify JWT token

// Dummy user
const user = {
  username: "admin",
  password: "1234"
};

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password } = req.body; //Extract data sent from frontend
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });//payload-data inside token
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware –middleware function to protects routes
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Reads token sent from frontend

  if (!token) return res.sendStatus(403);
//Token is valid and not expired
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded; // Stores decoded data in request
    next(); // Moves to next function (protected route)
  });
}

// Protected API
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

// Start server
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
