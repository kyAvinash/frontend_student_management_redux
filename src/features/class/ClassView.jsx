import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "../students/studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, status, error, filter, sortBy } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    return student.gender === filter;
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "Name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Marks") {
      return a.marks - b.marks;
    } else if (sortBy === "Attendance") {
      return a.attendance - b.attendance;
    }
    return 0;
  });

  return (
    <>
      <main className="container mt-4">
        <h1>Class View</h1>
        <div>
          <label htmlFor="selectGender">Filter by Gender:</label>{" "}
          <select
            id="selectGender"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="sortBy">Sort by:</label>{" "}
          <select id="sortBy" value={sortBy} onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Marks">Marks</option>
            <option value="Attendance">Attendance</option>
          </select>
        </div>
        <div className="mt-4">
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>{error}</p>}
          {status === "success" && students.length === 0 ? (
            <p>No students available.</p>
          ) : (
            <ul>
              {sortedStudents.map((student) => (
                <li key={student._id}>
                  {student.name} - {student.gender}
                  {student.marks ? (
                    <span> - Marks: {student.marks}</span>
                  ) : (
                    <span> - Marks: Unknown</span>
                  )}
                  {student.attendance ? (
                    <span> - Attendance: {student.attendance}</span>
                  ) : (
                    <span> - Attendance: Unknown</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

export default ClassView;
