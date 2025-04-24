import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNumber, setRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!rollNumber.trim()) newErrors.rollNumber = "Roll number is required.";
    if (!gender.trim()) newErrors.gender = "Gender is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
        setFirstName("");
        setLastName("");
        setRollNo("");
        setGender("");
        setErrors({});
      };

  const save = async (event) => {
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
      navigate("/", { state: { added: true } }); // 👈 Redirect with success flag
    } catch (err) {
      toast.error("Error adding student!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Student</h2>
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
          Submit
        </button>

        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={handleReset}>
           Reset
         </button>
      </form>
    </div>
  );
}

export default StudentForm;
