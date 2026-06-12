const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },

    rollno: {
      type: Number,
      required: [true, "Roll number is required"],
      unique: true,
      min: [1, "Roll number must be greater than 0"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);