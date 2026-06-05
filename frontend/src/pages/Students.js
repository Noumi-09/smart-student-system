import { useEffect, useState } from "react";
import API from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // GET ALL STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ADD STUDENT
  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await API.post("/student", {
        name,
        email,
      });

      setName("");
      setEmail("");
      fetchStudents();

      alert("Student added successfully!");
    } catch (err) {
      console.log(err);
      alert("Error adding student");
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/student/${id}`);
      fetchStudents();

      alert("Student deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // START EDIT
  const startEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
  };

  // UPDATE STUDENT
  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/student/${editId}`, {
        name,
        email,
      });

      setName("");
      setEmail("");
      setEditId(null);

      fetchStudents();

      alert("Student updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // FORM HANDLER
  const handleSubmit = editId ? updateStudent : addStudent;

  // SEARCH FILTER
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* TITLE */}
      <h2 className="text-center fw-bold mb-4">
        Student Management System
      </h2>

      {/* SEARCH BOX */}
      <div className="card shadow-sm p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FORM */}
      <div className="card shadow-sm p-4 mb-4">

        <h5 className="mb-3">
          {editId ? "Edit Student" : "Add New Student"}
        </h5>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter student email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${
                editId ? "btn-warning" : "btn-primary"
              }`}
            >
              {editId ? "Update Student" : "Add Student"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setEmail("");
                }}
              >
                Cancel
              </button>
            )}
          </div>

        </form>
      </div>

      {/* TABLE SECTION */}
      <div className="card shadow-sm p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Student List</h5>

          <span className="badge bg-primary">
            Total: {filteredStudents.length}
          </span>
        </div>

        {/* TABLE */}
        {filteredStudents.length === 0 ? (
          <div className="alert alert-info text-center">
            No students found. Add your first student above.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table table-hover align-middle table-striped">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((s, index) => (
                  <tr key={s.id}>

                    <td>{index + 1}</td>

                    <td className="fw-semibold">{s.name}</td>

                    <td>{s.email}</td>

                    <td>
                      <span className="badge bg-success">
                        Active
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(s)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(s.id)}
                      >
                        🗑 Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default Students;