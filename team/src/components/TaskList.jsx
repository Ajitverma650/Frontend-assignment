import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskProgress } from "../redux/slices/tasksSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Button,
} from "./ui/ui-base";

const TaskList = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state) => state.role);
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.assignedTo === currentUserId)
  );

  const handleProgressChange = (taskId, currentProgress, change) => {
    const newProgress = Math.min(100, Math.max(0, currentProgress + change));
    dispatch(updateTaskProgress({ taskId, progress: newProgress }));
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