import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTeacherAsync,
  updateTeacherAsync,
} from "../features/teacher/teachersSlice";

const TeacherForm = ({ editingTeacher = null, onSuccess }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(editingTeacher?.name || "");
  const [age, setAge] = useState(editingTeacher?.age || "");
  const [gender, setGender] = useState(editingTeacher?.gender || "");
  const [subject, setSubject] = useState(editingTeacher?.subject || "");
  const [experience, setExperience] = useState(
    editingTeacher?.experience || ""
  );
  const [qualification, setQualification] = useState(
    editingTeacher?.qualification || ""
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !subject) {
      setError("Please fill out all required fields.");
      return;
    }

    const teacherData = {
      name,
      age,
      gender,
      subject,
      experience,
      qualification,
    };

    try {
      if (editingTeacher) {
        await dispatch(
          updateTeacherAsync({
            id: editingTeacher._id,
            updatedTeacher: teacherData,
          })
        );
      } else {
        await dispatch(addTeacherAsync(teacherData));
      }
      setSuccess("Teacher saved successfully!");
      setError(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to save teacher. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <>
      <main className="container mt-4">
        <form onSubmit={handleSubmit}>
          <h3>{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h3>
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
          <div className="mt-4">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          {editingTeacher && (
            <>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Years of Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="mt-4">
            <button type="submit">{editingTeacher ? "Update" : "Add"}</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default TeacherForm;
