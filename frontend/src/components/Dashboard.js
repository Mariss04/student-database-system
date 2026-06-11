import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import EditModal from "./EditModal";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:1000/api/students";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

function Dashboard({ token, onUnauthorized }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        onUnauthorized();
        return;
      }

      alert(getErrorMessage(error));
    }
  }, [onUnauthorized, token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ADD STUDENT
  const addStudent = async (studentData) => {
    try {
      await axios.post(API_URL, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student added successfully!");
      fetchStudents();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  // UPDATE STUDENT
  const updateStudent = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student details updated!");
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  // SEARCH FILTER
  const filteredStudents = students.filter((s) => {
    const text = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(text) ||
      String(s.rollno).includes(text) ||
      s.department?.toLowerCase().includes(text)
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
