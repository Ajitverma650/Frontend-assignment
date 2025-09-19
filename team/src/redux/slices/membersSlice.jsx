import { createSlice } from "@reduxjs/toolkit";

const initialMembers = [
  {
    id: "1",
    name: "Aryan verma",
    avatar: "https://i.pinimg.com/474x/aa/dd/1a/aadd1a84088cfa777014394359482d9a.jpg?nii=t",
    status: "working",
    activeTasks: 3,
    completedTasks: 2,
  },
  {
    id: "2",
    name: "Nikita singh",
    avatar: "https://www.svgrepo.com/show/402067/letter-n.svg",
    status: "break",
    activeTasks: 1,
    completedTasks: 4,
  },
  {
    id: "3",
    name: "Anuradha Pandey",
    avatar: "https://i.pinimg.com/474x/aa/dd/1a/aadd1a84088cfa777014394359482d9a.jpg?nii=t",
    status: "meeting",
    activeTasks: 5,
    completedTasks: 0,
  },
  {
    id: "4",
    name: "niraj singh",
    avatar: "https://www.svgrepo.com/show/402067/letter-n.svg",
    status: "offline",
    activeTasks: 0,
    completedTasks: 5,
  },
];

const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: initialMembers,
    filter: "all",
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.status = status;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateMemberTaskCounts: (state, action) => {
    const { memberId, tasks } = action.payload;
    const member = state.members.find((m) => m.id === memberId);
    if (member) {
      const memberTasks = tasks.filter((task) => task.assignedTo === memberId);
      member.activeTasks = memberTasks.filter((task) => !task.completed).length;
      member.completedTasks = memberTasks.filter((task) => task.completed).length;
    }
  }
  },
});


export const { updateMemberStatus, setFilter, updateMemberTaskCounts } = membersSlice.actions;
export default membersSlice.reducer;