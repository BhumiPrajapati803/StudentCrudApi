import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentForm() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNumber, setRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const result = await axios.get("https://localhost:7231/api/Student/GetStudent");
    setStudents(result.data);
  }

  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!rollNumber.trim()) newErrors.rollNumber = "Roll number is required.";
    if (!gender.trim()) newErrors.gender = "Gender is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function save(event) {
    event.preventDefault();
    if (!validateFields()) {
      toast.error("Please fix the errors.");
      return;
    }

    try {
      await axios.post("https://localhost:7231/api/Student/AddStudent", {
        firstName,
        lastName,
        rollNumber,
        gender,
      });
      toast.success("Student added successfully!");
      setFirstName("");
      setLastName("");
      setRollNo("");
      setGender("");
      setErrors({});
      loadStudents();
    } catch (err) {
      toast.error("Error adding student!");
    }
  }

  async function deleteStudent(id) {
    await axios.delete(`https://localhost:7231/api/Student/DeleteStudent/${id}`);
    toast.success("Student deleted successfully!");
    loadStudents();
  }

  return (
    <div className="container mt-4">
      <h1>Student Details</h1>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label>Roll No.</label>
          <input
            type="text"
            className={`form-control ${errors.rollNumber ? "is-invalid" : ""}`}
            value={rollNumber}
            onChange={(e) => setRollNo(e.target.value)}
          />
          {errors.rollNumber && <div className="invalid-feedback">{errors.rollNumber}</div>}
        </div>

        <div className="form-group">
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
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        <button className="btn btn-primary mt-3" onClick={save}>
          Add
        </button>
      </form>

      <table className="table table-dark mt-5">
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

      <ToastContainer />
    </div>
  );
}

export default StudentForm;