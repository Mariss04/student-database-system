import React, { useEffect, useState } from "react";
import axios from "axios";

import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import EditModal from "./EditModal";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  const API = "http://localhost:1000/api/students";

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ADD STUDENT
  const addStudent = async (studentData) => {
    await axios.post(API, studentData);
    alert("Student added successfully!");
    fetchStudents();
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    await axios.delete(`${API}/${id}`);
    alert("Student deleted successfully!");
    fetchStudents();
  };

  // UPDATE STUDENT
  const updateStudent = async (id, updatedData) => {
    await axios.put(`${API}/${id}`, updatedData);
    alert("Student details updated!");
    setEditStudent(null);
    fetchStudents();
  };

  // SEARCH FILTER
  const filteredStudents = students.filter((s) => {
    const text = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(text) ||
      String(s.rollno).includes(text) ||
      s.department.toLowerCase().includes(text)
    );
  });

  return (
  <div className="dashboard-page">
    <div className="container py-4">
      <StudentForm addStudent={addStudent} />

      <StudentList
        students={filteredStudents}
        search={search}
        setSearch={setSearch}
        onEdit={setEditStudent}
        onDelete={deleteStudent}
      />

      {editStudent && (
        <EditModal
          student={editStudent}
          onClose={() => setEditStudent(null)}
          onSave={updateStudent}
        />
      )}
    </div>
  </div>
);

}

export default Dashboard;
