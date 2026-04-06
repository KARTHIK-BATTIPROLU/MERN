require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

// Model
const Student = mongoose.model("Student", studentSchema);

// GET ALL
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// GET BY ID
app.get("/students/:id", async (req, res) => {
  const data = await Student.findById(req.params.id);
  res.json(data);
});

// CREATE
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  const data = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
