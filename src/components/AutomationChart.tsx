"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { allProjects } from "@/lib/work-data";

const barColor = (progress: number) => {
  if (progress >= 80) return "#4f46e5";
  if (progress >= 30) return "#818cf8";
  return "#c7d2fe";
};

export default function AutomationChart() {
  const data = [...allProjects]
    .sort((a, b) => b.progress - a.progress)
    .map((p) => ({ name: p.name, progress: p.progress }));

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-700">프로젝트별 자동화 진행률</p>
      <p className="mt-1 text-xs text-slate-400">단위: %</p>
      <div className="mt-4" style={{ height: data.length * 38 + 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
            <YAxis
              type="category"
              dataKey="name"
              width={190}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value) => [`${value}%`, "진행률"]}
            />
            <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={barColor(entry.progress)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
