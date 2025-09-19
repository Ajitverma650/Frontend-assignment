import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice";
import { updateMemberTaskCounts } from "../redux/slices/membersSlice"; // Import the new action
import { Button, Input } from "./ui/ui-base";

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  
  // Get all tasks to pass to the reducer
  const allTasks = useSelector((state) => state.tasks.tasks);
  
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && assignedTo && dueDate) {
      // Dispatch action to add the new task
      dispatch(addTask({ title, assignedTo, dueDate }));
      
      // Dispatch action to update the member's task counts
      dispatch(updateMemberTaskCounts({ memberId: assignedTo, tasks: allTasks }));
      
      // Reset form fields
      setTitle("");
      setAssignedTo("");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h3 className="font-semibold dark:text-white">Assign a new task</h3>
      <Input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="dark:bg-gray-800 dark:text-white"
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Select a member</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="dark:bg-gray-800 dark:text-white"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;