import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice";
import roleReducer from "./slices/roleSlice";
import tasksReducer from "./slices/tasksSlice";

// Function to save the state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Function to load the state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    tasks: tasksReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});