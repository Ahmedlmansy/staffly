import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const defaultData = [
  { day: "Mon", attendance: 85 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 96 },
  { day: "Thu", attendance: 88 },
  { day: "Fri", attendance: 82 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="font-semibold text-[#111418] dark:text-white">{label}</p>
      <p className="text-[#137fec] font-bold">{payload[0].value}%</p>
    </div>
  );
}

export function WeeklyAttendanceChart({ data = defaultData }) {
  const maxValue = Math.max(...data.map((d) => d.attendance));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-6">
        Weekly Attendance Trends
      </h3>

      <ResponsiveContainer width="100%" height={256}>
        <BarChart
          data={data}
          barCategoryGap="30%"
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f1f5f9", radius: 6 }}
          />
          <Bar dataKey="attendance" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((entry) => (
              <Cell
                key={entry.day}
                fill={
                  entry.attendance === maxValue
                    ? "#137fec"
                    : `rgba(19,127,236,${0.3 + (entry.attendance / 100) * 0.4})`
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
