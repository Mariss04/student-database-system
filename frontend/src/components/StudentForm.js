import React, { useState } from "react";

function StudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !rollno || !department || !year) {
      alert("Please fill all fields!");
      return;
    }

    addStudent({
      name,
      rollno: Number(rollno),
      department,
      year: Number(year),
    });

    setName("");
    setRollno("");
    setDepartment("");
    setYear("");
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="bg-primary text-white p-3 rounded">Add New Student</h4>

      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <label className="fw-semibold">Student Name</label>
            <input
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold">Roll Number</label>
            <input
              className="form-control"
              placeholder="Enter roll no"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold">Department</label>
            <input
              className="form-control"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold">Year</label>
            <input
              className="form-control"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-success px-4 fw-bold float-end">
          ➕ Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
