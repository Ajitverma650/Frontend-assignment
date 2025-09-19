import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/ui-base";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TeamStats = () => {
  const members = useSelector((state) => state.members.members);
  const stats = members.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    },
    { working: 0, break: 0, meeting: 0, offline: 0 }
  );

  const data = [
    { name: 'Working', value: stats.working },
    { name: 'On Break', value: stats.break },
    { name: 'In a Meeting', value: stats.meeting },
    { name: 'Offline', value: stats.offline },
  ];

  const COLORS = ['#16a34a', '#facc15', '#3b82f6', '#9ca3af'];


  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Status</CardTitle>
        <p className="text-sm text-gray-500">
            {stats.working} Working, {stats.meeting} Meeting, {stats.break} On Break, {stats.offline} Offline
        </p>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStats;