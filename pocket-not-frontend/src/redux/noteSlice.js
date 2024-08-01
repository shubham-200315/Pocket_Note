import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const createGroup = createAsyncThunk(
  "notes/createGroup",
  async (groupData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/groups`, groupData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/notes`, noteData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ noteId }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${noteId}`);
      return { noteId }; // Only return noteId to help with state update
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, content, groupId }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/notes/${noteId}`, {
        content,
        groupId
      });
      return response.data; // Return updated note data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "notes/deleteGroup",
  async (groupId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/groups/${groupId}`);
      return { groupId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    groups: [],
    currentActiveGroup: null,
    status: null,
    error: null,
  },
  reducers: {
    changeCurrentActiveGroup: (state, action) => {
      state.currentActiveGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(createNote.fulfilled, (state, action) => {
        const group = state.groups.find(
          (group) => group._id === action.payload.groupId
        );
        if (group) {
          group.notes.push(action.payload);
        }
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const group = state.groups.find(
          (group) => group._id === action.payload.groupId
        );
        if (group) {
          const note = group.notes.find((note) => note._id === action.payload._id);
          if (note) {
            note.content = action.payload.content;
          }
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const group = state.groups.find(
          (group) => group._id === action.payload.groupId
        );
        if (group) {
          group.notes = group.notes.filter((note) => note._id !== action.payload.noteId);
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((group) => group._id !== action.payload.groupId);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { changeCurrentActiveGroup } = noteSlice.actions;
export default noteSlice.reducer;
