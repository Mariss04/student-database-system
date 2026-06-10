const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/* ================================
   GET ALL STUDENTS
================================ */
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   ADD STUDENT
================================ */
router.post("/students", async (req, res) => {
  try {
    const { name, rollno, department, year } = req.body;

    const newStudent = new Student({
      name,
      rollno,
      department,
      year,
    });

    await newStudent.save();
    res.json({ message: "Student added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   UPDATE STUDENT
================================ */
router.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ message: "Student details updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   DELETE STUDENT
================================ */
router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
