import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberStatus } from "../redux/slices/membersSlice";
import { Button } from "./ui/ui-base";

const StatusSelector = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state) => state.role);

  const handleStatusChange = (status) => {
    dispatch(updateMemberStatus({ memberId: currentUserId, status }));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h3 className="font-semibold mb-2 dark:text-white">Update Your Status</h3>
      <div className="flex space-x-2">
        <Button onClick={() => handleStatusChange("working")}>Working</Button>
        <Button onClick={() => handleStatusChange("break")}>Break</Button>
        <Button onClick={() => handleStatusChange("meeting")}>Meeting</Button>
        <Button onClick={() => handleStatusChange("offline")}>Offline</Button>
      </div>
    </div>
  );
};

export default StatusSelector;