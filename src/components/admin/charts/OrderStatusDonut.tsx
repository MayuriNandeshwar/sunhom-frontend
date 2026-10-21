"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1f2937", // dark
  "#4b5563",
  "#9ca3af",
  "#f87171",
  "#34d399",
];

// `type` (not `interface`): recharts' data prop is Record<string, unknown>-like,
// and only type aliases are implicitly assignable to it.
type StatusData = {
  status: string;
  count: number;
};

export default function OrderStatusDonut({
  data,
}: {
  data: StatusData[];
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Order Status Distribution
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            innerRadius={70}
            outerRadius={100}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
