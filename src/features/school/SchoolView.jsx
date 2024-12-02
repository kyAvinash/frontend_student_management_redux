import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";
import { fetchTeachers } from "../teacher/teachersSlice";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";

const SchoolView = () => {
  const dispatch = useDispatch();

  const { students, status: studentStatus } = useSelector(
    (state) => state.students
  );
  const { teachers, status: teacherStatus } = useSelector(
    (state) => state.teachers
  );

  const { totalStudents, averageAttendance, averageMarks, topStudent } =
    useSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const totalAttendance = students.reduce(
        (acc, student) => acc + (student.attendance || 0),
        0
      );
      const totalMarks = students.reduce(
        (acc, student) => acc + (student.marks || 0),
        0
      );

      const averageAttendance = totalAttendance / totalStudents;
      const averageMarks = totalMarks / totalStudents;

      const topStudent = students.reduce(
        (max, student) => (student.marks > max.marks ? student : max),
        students[0]
      );

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
          topStudent,
        })
      );
      dispatch(setTopStudent(topStudent));
    }
  }, []);

  return (
    <main className="container mt-4">
      <h1>School View</h1>
      <div className="row">
        {/* Student Data Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              Student Data
            </div>
            <div className="card-body">
              {studentStatus === "loading" && <p>Loading students...</p>}
              {studentStatus === "error" && <p>Error loading students.</p>}
              {students.length === 0 ? (
                <p>No students available.</p>
              ) : (
                <ul>
                  <li>Total Students: {totalStudents}</li>
                  <li>Average Attendance: {averageAttendance.toFixed(2)}%</li>
                  <li>Average Marks: {averageMarks.toFixed(2)}</li>
                  <li>
                    Top Student: {topStudent ? `${topStudent.name}` : "-"}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Teacher Data Card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              Teacher Data
            </div>
            <div className="card-body">
              {teacherStatus === "loading" && <p>Loading teachers...</p>}
              {teacherStatus === "error" && <p>Error loading teachers.</p>}
              {teachers.length === 0 ? (
                <p>No teachers available.</p>
              ) : (
                <ul>
                  {teachers.map((teacher) => (
                    <li key={teacher._id}>
                      Name: {teacher.name} <br />
                      Subject: {teacher.subject}
                      {teacher.experience && (
                        <>
                          <br />
                          <span>Experience: {teacher.experience} years</span>
                        </>
                      )}
                      {teacher.qualification && (
                        <>
                          <br />
                          <span>Qualification: {teacher.qualification}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SchoolView;

/* 

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopStudent, updateSchoolStats } from "./schoolSlice";

const SchoolView = () => {
  const dispatch = useDispatch();

  const { students, status } = useSelector((state) => state.students);
  const { totalStudents, averageAttendance, averageMarks, topStudent } =
    useSelector((state) => state.school);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const totalAttendance = students.reduce(
        (acc, student) => acc + (student.attendance || 0),
        0
      );
      const totalMarks = students.reduce(
        (acc, student) => acc + (student.marks || 0),
        0
      );

      const averageAttendance = totalAttendance / totalStudents;
      const averageMarks = totalMarks / totalStudents;

      const topStudent = students.reduce(
        (max, student) => (student.marks > max.marks ? student : max),
        students[0]
      );

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
          topStudent,
        })
      );
      dispatch(setTopStudent(topStudent));
    }
  }, []);
  return (
    <>
      <main className="container mt-4">
        <h1>School View</h1>
        {students.length === 0 ? (
          <p>No students available.</p>
        ) : (
          <div>
            <p>Total Students: {totalStudents}</p>
            <p>Average Attendance: {averageAttendance.toFixed(2)}</p>
            <p>Average Marks: {averageMarks.toFixed(2)}</p>
            <p>
              Top Performing Student: {topStudent ? topStudent.name : "-"}
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default SchoolView;


*/
