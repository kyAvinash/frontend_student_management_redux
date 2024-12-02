import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteTeacherAsync } from "../features/teacher/teachersSlice";
import TeacherForm from "./TeacherForm";

const TeacherDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const teacher = useSelector((state) =>
    state.teachers.teachers.find((tch) => tch._id === id)
  );

  useEffect(() => {
    if (!teacher) {
      setMessage("Teacher not found");
    } else {
      setMessage(null);
    }
  }, [teacher]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTeacherAsync(id));
      setMessage("Teacher deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete teacher. Please try again.");
    }
  };

  return (
    <div>
      <main className="container mt-4">
        <h3>Teacher Details</h3>
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
            <p>Name: {teacher?.name}</p>
            <p>Age: {teacher?.age}</p>
            <p>Gender: {teacher?.gender}</p>
            <p>Subject: {teacher?.subject}</p>
            {teacher?.qualification && <p>Qualification: {teacher?.qualification}</p>}
            {teacher?.experience && <p>Experience: {teacher?.experience} years</p>}
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
          <TeacherForm
            editingTeacher={teacher}
            onSuccess={() => setIsEditing(false)}
          />
        )}
      </main>
    </div>
  );
};

export default TeacherDetails;
