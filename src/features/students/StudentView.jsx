import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { Link } from "react-router-dom";

const StudentView = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  return (
    <>
      <main className="container">
        <h1 className="mt-3">Student View</h1>
        <Link
          className="btn btn-warning text-primary text-decoration-underline"
          to="/addStudent"
        >
          Add student
        </Link>
        <div className="ms-3">
          <h2 className="mt-3">Student List</h2>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>Error:{error}</p>}
          {status === "success" && students.length === 0 ? (
            <p>No students available.</p>
          ) : (
            <ul>
              {students.map((student) => (
                <li key={student._id}>
                  <Link to={`/studentDetails/${student._id}`}>
                    {student.name} (Age: {student.age})
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

export default StudentView;
