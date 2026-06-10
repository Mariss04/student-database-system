import React from "react";

function StudentList({ students, search, setSearch, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 rounded">
        <h4 className="m-0">🎓 Student List</h4>

        <input 
        className="search-input"
        style={{ width: "320px" }}
        placeholder="Search by name, roll no, or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Year</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center fw-bold">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.rollno}</td>
                <td>{s.department}</td>
                <td>{s.year}</td>
                <td className="text-center">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEdit(s)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(s._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
