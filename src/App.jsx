import StudentView from "./features/students/StudentView";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import StudentForm from "./pages/StudentForm";
import ClassView from "./features/class/ClassView";
import StudentDetails from "./pages/StudentDetails";
import SchoolView from "./features/school/SchoolView";
import TeacherView from "./features/teacher/TeacherView";
import TeacherForm from "./pages/TeacherForm";
import TeacherDetails from "./pages/TeacherDetails";
function App() {
  return (
    <>
      <Router>
        <header className="bg-light">
          <nav className="navbar navbar-expand-lg container py-2">
            <NavLink to="/" className="navbar-brand">
              Student Management System
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Students
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teachers">
                    Teachers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/classView">
                    Classes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/schoolView">
                    School
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/addStudent" element={<StudentForm />} />
          <Route path="/classView" element={<ClassView />} />
          <Route path="/studentDetails/:id" element={<StudentDetails />} />
          <Route path="/schoolView" element={<SchoolView />} />
          <Route path="/teachers" element={<TeacherView />} />
          <Route path="/addTeacher" element={<TeacherForm />} />
          <Route path="/teacherDetails/:id" element={<TeacherDetails/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
