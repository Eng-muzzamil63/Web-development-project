const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

app.post("/students", (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email"
    });
  }

  const student = {
    id: Date.now(),
    name,
    email,
    course
  };

  students.push(student);

  res.status(201).json({
    message: "Student added successfully",
    student
  });
});

app.delete("/students/:id", (req, res) => {
  students = students.filter(
    s => s.id !== Number(req.params.id)
  );

  res.json({
    message: "Student deleted"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});