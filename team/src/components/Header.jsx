import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchRole } from "../redux/slices/roleSlice";
import { Button } from "./ui/ui-base";
// No longer need to import ThemeToggle here
// import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);

  const handleRoleChange = () => {
    const newRole = currentRole === "lead" ? "member" : "lead";
    dispatch(switchRole(newRole));
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Login Status</h1>
        <p className="text-sm text-gray-500">
          Logged in as: {currentUser} ({currentRole})
        </p>
      </div>
      {/* The ThemeToggle has been removed from this div */}
      <div className="flex items-center gap-4">
        <Button onClick={handleRoleChange}>
          Switch to {currentRole === "lead" ? "Member" : "Lead"} View
        </Button>
      </div>
    </header>
  );
};

export default Header;