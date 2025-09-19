import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: "lead", // or 'member'
    currentUser: "aryan verma",
    currentUserId: "1",
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload.name;
      state.currentUserId = action.payload.id;
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;