import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/ui-base";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/ui-base";

const MemberCard = ({ member }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{member.name}</CardTitle>
            <p
              className={`text-sm capitalize ${
                member.status === "working"
                  ? "text-green-500"
                  : member.status === "break"
                  ? "text-yellow-500"
                  : member.status === "meeting"
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {member.status}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Tasks</p>
            <p className="text-lg font-semibold">{member.activeTasks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed Tasks</p>
            <p className="text-lg font-semibold">{member.completedTasks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;