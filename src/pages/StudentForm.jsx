import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addStudentAsync,
  updateStudentAsync,
} from "../features/students/studentsSlice";

const StudentForm = ({ editingStudent = null, onSuccess }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(editingStudent?.name || "");
  const [age, setAge] = useState(editingStudent?.age || "");
  const [grade, setGrade] = useState(editingStudent?.grade || "");
  const [gender, setGender] = useState(editingStudent?.gender || "");
  const [attendance, setAttendance] = useState(
    editingStudent?.attendance || ""
  );
  const [marks, setMarks] = useState(editingStudent?.marks || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !grade || !gender) {
      setError("Please fill out all required fields.");
      return;
    }

    const studentData = { name, age, grade, gender, attendance, marks };

    try {
      if (editingStudent) {
        await dispatch(
          updateStudentAsync({
            id: editingStudent._id,
            updatedStudent: studentData,
          })
        );
      } else {
        await dispatch(addStudentAsync(studentData));
      }
      setSuccess("Student saved successfully!");
      setError(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to save student. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <>
      <main className="container mt-4">
        <form onSubmit={handleSubmit}>
          <h3>{editingStudent ? "Edit Student" : "Add Student"}</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label>Gender:</label>{" "}
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>{" "}
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
          </div>
          {editingStudent && (
            <>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mt-4">
            <button type="submit">{editingStudent ? "Update" : "Add"}</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default StudentForm;
