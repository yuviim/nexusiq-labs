import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { engine: "Exasol", runtime: 1.8 },
  { engine: "ClickHouse", runtime: 3.9 },
  { engine: "Trino", runtime: 4.8 },
  { engine: "Databricks", runtime: 6.8 },
  { engine: "BigQuery", runtime: 7.0 },
  { engine: "Snowflake", runtime: 7.2 },
];

export default function RuntimeBarChart() {
  return (
    <div className="h-[330px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 24, left: 28, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <XAxis
            type="number"
            domain={[0, 8]}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="engine"
            width={82}
            tick={{ fontSize: 11, fill: "#334155" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              fontSize: 12,
            }}
            formatter={(value) => [`${value}s`, "Runtime"]}
          />

          <Bar
            dataKey="runtime"
            radius={[0, 10, 10, 0]}
            fill="url(#runtimeGradient)"
            barSize={28}
          />

          <defs>
            <linearGradient id="runtimeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}