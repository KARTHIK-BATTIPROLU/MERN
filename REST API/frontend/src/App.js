import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3000/students';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', course: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', age: '', course: '' });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, course: student.course });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Management (CRUD)</h2>
      
      <div className="card p-4 mb-4">
        <h4>{editingId ? "Edit Student" : "Add New Student"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="age" className="form-control" placeholder="Age" value={form.age} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="course" className="form-control" placeholder="Course" value={form.course} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update Student" : "Add Student"}
          </button>
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => { setEditingId(null); setForm({ name: '', age: '', course: '' }); }}>
            Clear / Cancel
          </button>
        </form>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(student)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
