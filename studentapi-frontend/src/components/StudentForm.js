import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentForm() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNumber, setRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const result = await axios.get("https://localhost:7231/api/Student/GetStudent");
    setStudents(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7231/api/Student/AddStudent", {
        firstName: firstName,
        lastName: lastName,
        rollNumber: rollNumber,
        gender: gender,
      });
      alert("Student added successfully!");
      setFirstName("");
      setLastName("");
      setRollNo("");
      setGender("");
      loadStudents();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  async function deleteStudent(id) {
    await axios.delete(`https://localhost:7231/api/Student/DeleteStudent/${id}`);
    alert("Student deleted successfully!");
    loadStudents();
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label>Roll No.</label>
            <input
              type="text"
              className="form-control"
              value={rollNumber}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />

            <label>Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>

          <button className="btn btn-primary mt-4" onClick={save}>
            Add
          </button>
        </form>
      </div>

      <br />

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll No</th>
            <th>Gender</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.rollNumber}</td>
              <td>{student.gender}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentForm;
