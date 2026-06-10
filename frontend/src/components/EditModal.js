import React, { useState } from "react";

function EditModal({ student, onClose, onSave }) {
  const [name, setName] = useState(student.name);
  const [rollno, setRollno] = useState(student.rollno);
  const [department, setDepartment] = useState(student.department);
  const [year, setYear] = useState(student.year);

  const handleUpdate = (e) => {
    e.preventDefault();

    onSave(student._id, {
      name,
      rollno: Number(rollno),
      department,
      year: Number(year),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box shadow-lg">
        <h3 className="fw-bold mb-3">Edit Student</h3>

        <form onSubmit={handleUpdate}>
          <label className="fw-semibold">Student Name</label>
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="fw-semibold">Roll Number</label>
          <input
            className="form-control mb-3"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />

          <label className="fw-semibold">Department</label>
          <input
            className="form-control mb-3"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <label className="fw-semibold">Year</label>
          <input
            className="form-control mb-4"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <div className="d-flex justify-content-end gap-3">
            <button type="button" className="btn btn-dark" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
