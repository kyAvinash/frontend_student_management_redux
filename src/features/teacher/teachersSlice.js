import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTeachers = createAsyncThunk(
    "teachers/fetchTeachers",
    async () => {
      const response = await axios.get("https://backend-student-management-five.vercel.app/teachers");
      return response.data;
    }
  );

  export const addTeacherAsync = createAsyncThunk(
    "teachers/addTeacher",
    async (newTeacher) => {
      const response = await axios.post("https://backend-student-management-five.vercel.app/teachers", newTeacher);
      return response.data;
    }
  );

  export const updateTeacherAsync = createAsyncThunk(
    "teachers/updateTeacher",
    async ({ id, updatedTeacher }) => {
      const response = await axios.put(`https://backend-student-management-five.vercel.app/teachers/${id}`, updatedTeacher);
      return response.data;
    }
  );


  export const deleteTeacherAsync = createAsyncThunk(
    "teachers/deleteTeacher",
    async (id) => {
      await axios.delete(`https://backend-student-management-five.vercel.app/teachers/${id}`);
      return id;
    }
  );

  export const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
      teachers: [],
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeachers.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchTeachers.fulfilled, (state, action) => {
          state.status = "success";
          state.teachers = action.payload;
        })
        .addCase(fetchTeachers.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        })
        .addCase(addTeacherAsync.fulfilled, (state, action) => {
          state.teachers.push(action.payload);
        })
        .addCase(updateTeacherAsync.fulfilled, (state, action) => {
          const index = state.teachers.findIndex((teacher) => teacher._id === action.payload._id);
          if (index !== -1) {
            state.teachers[index] = action.payload;
          }
        })
        .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
          state.teachers = state.teachers.filter((teacher) => teacher._id !== action.payload);
        });
    },
  });
  
  export default teachersSlice.reducer;

