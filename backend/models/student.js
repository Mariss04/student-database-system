const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  rollno: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },

  department: {
    type: String,
    required: true,
    trim: true,
  },

  year: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Student", studentSchema);
