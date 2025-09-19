import React from 'react';
import { useSelector } from 'react-redux';
import StatusSelector from '../components/StatusSelector';
import TaskList from '../components/TaskList';
import MemberCard from '../components/MemberCard';
import TeamStats from '../components/TeamStats';

const TeamMemberView = () => {
  const { currentUserId } = useSelector((state) => state.role);
  const currentMember = useSelector((state) =>
    state.members.members.find((m) => m.id === currentUserId)
  );
  const tasks = useSelector((state) => state.tasks.tasks);

  const userTasks = tasks.filter((task) => task.assignedTo === currentUserId);
  const completedTasks = userTasks.filter((task) => task.completed).length;
  const activeTasks = userTasks.length - completedTasks;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Team Member Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your status and track your task progress</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-6">
          {/* Current Member Card */}
          {currentMember && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Profile</h2>
              <MemberCard member={currentMember} />
            </div>
          )}

          {/* Task Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{userTasks.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{activeTasks}</div>
              <div className="text-gray-600 dark:text-gray-400">Active Tasks</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedTasks}</div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </div>

          {/* Your Tasks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Tasks</h2>
            <TaskList />
          </div>

          {/* Team Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team Overview</h2>
            <TeamStats />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Selector */}
          <StatusSelector />

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Progress</h3>
            <div className="space-y-4">
              {userTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{task.title}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-2 text-sm font-bold text-gray-600 dark:text-gray-400">{task.progress}%</span>
                </div>
              ))}
              {userTasks.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No active tasks</p>
              )}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Completion Rate</span>
                <span className="font-semibold">
                  {userTasks.length > 0
                    ? Math.round((completedTasks / userTasks.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Average Progress</span>
                <span className="font-semibold">
                  {userTasks.length > 0
                    ? Math.round(
                        userTasks.reduce((sum, task) => sum + task.progress, 0) /
                          userTasks.length
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Status</span>
                <span
                  className={`font-semibold capitalize ${
                    currentMember?.status === 'working'
                      ? 'text-green-600'
                      : currentMember?.status === 'break'
                      ? 'text-yellow-600'
                      : currentMember?.status === 'meeting'
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  {currentMember?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberView;