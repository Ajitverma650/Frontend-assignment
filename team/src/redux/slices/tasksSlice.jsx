import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  {
    id: "1",
    title: "Develop new feature for dashboard",
    assignedTo: "1",
    dueDate: "2024-12-25",
    progress: 40,
    completed: false,
  },
  {
    id: "2",
    title: "Fix bug in authentication flow",
    assignedTo: "1",
    dueDate: "2024-12-15",
    progress: 100,
    completed: true,
  },
  {
    id: "3",
    title: "Write documentation for API",
    assignedTo: "2",
    dueDate: "2024-12-20",
    progress: 10,
    completed: false,
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: initialTasks,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
        progress: 0,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    updateTaskProgress: (state, action) => {
      const { taskId, progress } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.progress = progress;
        if (progress === 100) {
          task.completed = true;
        } else {
          task.completed = false;
        }
      }
    },
    // Add other task-related reducers here
  },
});

export const { addTask, updateTaskProgress } = tasksSlice.actions;

export default tasksSlice.reducer;