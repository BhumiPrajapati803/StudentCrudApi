import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    loadStudents();

    if (location.state?.added) {
      toast.success("Student added successfully!");
    }
  }, [location]);

  const loadStudents = async () => {
    const result = await axios.get("https://localhost:7231/api/Student/GetStudent");
    setStudents(result.data);
  };

  const confirmDeleteStudent = (id) => {
    const toastId = toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this student?</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                await axios.delete(`https://localhost:7231/api/Student/DeleteStudent/${id}`);
                loadStudents();
                toast.dismiss(toastId); 
                toast.success("Student deleted successfully!");
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => toast.dismiss(toastId)}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll No</th>
            <th>Gender</th>
            <th>Options</th>
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
                  onClick={() => confirmDeleteStudent(student.id)}
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

export default StudentList;
