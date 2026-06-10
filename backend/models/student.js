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
  },

  department: {
    type: String,
    required: true,
    trim: true,
  },

  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
