import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TeamLeadView from "./TeamLeadView";
import TeamMemberView from "./TeamMemberView";

const Dashboard = () => {
  const { currentRole } = useSelector((state) => state.role);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        {/* Add dark mode class to the main content area */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {currentRole === "lead" ? <TeamLeadView /> : <TeamMemberView />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;