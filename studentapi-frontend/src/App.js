import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();

  return (
    <div className="container mt-4">
      {location.pathname === "/" && (
        <nav className="mb-4">
          <Link className="btn btn-success" to="/add-student">Add Student</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add-student" element={<StudentForm />} />
      </Routes>
    </div>
  );
}

export default App;

