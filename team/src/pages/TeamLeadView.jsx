import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/membersSlice";
import MemberCard from "../components/MemberCard";
import TaskForm from "../components/TaskForm";
import TeamStats from "../components/TeamStats";
import { Button } from "../components/ui/ui-base";

const TeamLeadView = () => {
  const dispatch = useDispatch();
  const { members, filter } = useSelector((state) => state.members);

  const filteredMembers = members.filter((member) => {
    if (filter === "all") return true;
    return member.status === filter;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Member Status</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={() => dispatch(setFilter("all"))}>All</Button>
          <Button onClick={() => dispatch(setFilter("working"))}>
            Working
          </Button>
          <Button onClick={() => dispatch(setFilter("break"))}>Break</Button>
          <Button onClick={() => dispatch(setFilter("meeting"))}>
            Meeting
          </Button>
          <Button onClick={() => dispatch(setFilter("offline"))}>
            Offline
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <TeamStats />
        <TaskForm />
      </div>
    </div>
  );
};

export default TeamLeadView;