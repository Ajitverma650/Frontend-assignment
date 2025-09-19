import React from "react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/ui-interactive";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  Briefcase,
  Moon,
  Sun,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "#" },
  { name: "Projects", icon: Briefcase, path: "#" },
  { name: "Members", icon: Users, path: "#" },
  { name: "Tasks", icon: ClipboardList, path: "#" },
  { name: "Settings", icon: Settings, path: "#" },
];

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-700 p-2 mt-6">
       <div className="flex items-center">
        {isDarkMode ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-gray-800" />}
        <span className="ml-4 text-sm font-medium text-gray-800 dark:text-gray-200">
          Dark Mode
        </span>
       </div>
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      {/* Top Section */}
      <button className="flex items-center px-4 py-3 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200">
        <Briefcase className="w-6 h-6" />
        <span className="mx-4 text-lg font-semibold">MY-task</span>
      </button>

      {/* Navigation */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              className="flex items-center px-4 py-2 mt-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href={item.path}
            >
              <item.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;