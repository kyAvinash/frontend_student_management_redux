import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteStudentAsync } from "../features/students/studentsSlice";
import StudentForm from "./StudentForm";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const student = useSelector((state) =>
    state.students.students.find((stu) => stu._id === id)
  );

  useEffect(() => {
    if (!student) {
      setMessage("Student not found");
    } else {
      setMessage(null);
    }
  }, [student]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteStudentAsync(id));
      setMessage("Student deleted successfully.");
      //console.log(id);
    } catch (error) {
      setMessage("Failed to delete student. Please try again.");
    }
  };

  return (
    <div>
      <main className="container mt-4">
        <h3>Student Details</h3>
        {message && (
          <div
            className={`alert ${
              message.includes("deleted") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        {!message && !isEditing && (
          <>
            <p>Name: {student?.name}</p>
            <p>Age: {student?.age}</p>
            <p>Grade: {student?.grade}</p>
            <p>Gender: {student?.gender}</p>
            {student?.attendance && <p>Attendance: {student?.attendance}</p>}
            {student?.marks && <p>Marks: {student?.marks}</p>}
            <button
              className="btn btn-warning text-primary text-decoration-underline"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>{" "}
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}

        {!message && isEditing && (
          <StudentForm
            editingStudent={student}
            onSuccess={() => setIsEditing(false)}
          />
        )}
      </main>
    </div>
  );
};

export default StudentDetails;
