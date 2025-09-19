import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from '@reduxjs/toolkit';
import { updateTaskProgress } from "../redux/slices/tasksSlice";
import { updateMemberTaskCounts } from "../redux/slices/membersSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Button,
} from "./ui/ui-base";

// Input selectors to get raw data from the state
const selectTasks = (state) => state.tasks.tasks;
const selectCurrentUserId = (state) => state.role.currentUserId;

// Create a memoized selector that only recalculates when its inputs change
const selectTasksForCurrentUser = createSelector(
  [selectTasks, selectCurrentUserId],
  (tasks, currentUserId) => tasks.filter((task) => task.assignedTo === currentUserId)
);

const TaskList = () => {
  const dispatch = useDispatch();
  
  // Use the new memoized selector
  const tasks = useSelector(selectTasksForCurrentUser);
  
  const { currentUserId } = useSelector((state) => state.role);
  const allTasks = useSelector((state) => state.tasks.tasks);

  const handleProgressChange = (taskId, currentProgress, change) => {
    const newProgress = Math.min(100, Math.max(0, currentProgress + change));
    dispatch(updateTaskProgress({ taskId, progress: newProgress }));
    
    // Dispatch the action to update member task counts
    dispatch(updateMemberTaskCounts({ memberId: currentUserId, tasks: allTasks }));
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleProgressChange(task.id, task.progress, -10)}
              >
                -
              </Button>
              <Progress value={task.progress} className="w-full" />
              <Button
                onClick={() => handleProgressChange(task.id, task.progress, 10)}
              >
                +
              </Button>
            </div>
            <p className="text-center text-sm mt-2">{task.progress}%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;