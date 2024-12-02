import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "./teachersSlice";
import { Link } from "react-router-dom";

const TeacherView = () => {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  return (
    <>
      <main className="container">
        <h1 className="mt-3">Teacher View</h1>
        <Link
          className="btn btn-warning text-primary text-decoration-underline"
          to="/addTeacher"
        >
          Add Teacher
        </Link>
        <div className="ms-3">
          <h2 className="mt-3">Teachers List</h2>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {status === "success" && teachers.length === 0 ? (
            <p>No teachers available.</p>
          ) : (
            <ul>
              {teachers.map((teacher) => (
                <li key={teacher._id}>
                  <Link to={`/teacherDetails/${teacher._id}`}>
                    {teacher.name} (Subject: {teacher.subject})
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

export default TeacherView;
