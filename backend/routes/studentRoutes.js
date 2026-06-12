const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/student");

const router = express.Router();

const formatStudentData = (body) => ({
  name: String(body.name || "").trim(),
  rollno: Number(body.rollno),
  department: String(body.department || "").trim(),
  year: Number(body.year),
});

const validateStudentData = ({ name, rollno, department, year }) => {
  if (!name || !department) {
    return "Name and department are required.";
  }

  if (!Number.isInteger(rollno) || rollno <= 0) {
    return "Roll number must be a positive number.";
  }

  if (!Number.isInteger(year) || year <= 0) {
    return "Year must be a positive number.";
  }

  return null;
};

const isInvalidId = (id) => !mongoose.Types.ObjectId.isValid(id);

const handleError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({ message: "Roll number already exists." });
  }

  return res.status(500).json({ message: error.message });
};

//  GET ALL STUDENTS
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  //  ADD STUDENT
router.post("/students", async (req, res) => {
  try {
    const studentData = formatStudentData(req.body);
    const validationError = validateStudentData(studentData);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newStudent = new Student(studentData);
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    handleError(res, error);
  }
});

//  UPDATE STUDENT
router.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = formatStudentData(req.body);
    const validationError = validateStudentData(studentData);

    if (isInvalidId(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, studentData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student details updated!", student: updatedStudent });
  } catch (error) {
    handleError(res, error);
  }
});

//  DELETE STUDENT
router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
