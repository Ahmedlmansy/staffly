import { cn } from "@/lib/utils";

const statusStyles = {
  on_time: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100   text-amber-700",
  late: "bg-red-100     text-red-700",
};

const statusLabels = {
  on_time: "On Time",
  pending: "Pending",
  late: "Late",
};

const defaultActivities = [
  {
    id: 1,
    name: "David Chen",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC56hjoP-sVulT2WF_S2BgChgqV49viBtDZtLCAoCpyS0V3WSpGPKSPMXGS609S-CrKrXcqoOPwLIi6THQuBjs2g7FJQUhdhj3pMivaBz-Oa8RfBNk95IyYzNJYqWp4XMMMFZsg_vEcx_gGWXqX9WsvRVqLu8wvpj8ofXr7QNybywo8UyeCnCa-l4crA669ek19jThXZkqxCZrqibx5gucKGFkbCnUULmDb7Au4s_JAeFg1tsE0qvaTNRqZr02nEk-z4mS0GedvJVY",
    action: "Clock In",
    time: "08:45 AM",
    status: "on_time",
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmzg8kVoerWCaNGxuEZ6GABORJOwLMxEotKUz_VOH74FQ7cRsKJg5N2n7YFY0eXK0hfY4Spe86YXz85L2bBVFAZgvXXzCrF0A5K6v11Lspytx6eBCzdX_x60WNYIaRaFfllqCrp323M1Q4iSuGxkpsKgxkW_WLOEurXaBvf0K6F7Z0ZJo5VlkengvSvbBg0r0rMfKK5yed0LN0kRNZdXqZd-UU9VwVHJlztemSwxUgyZ9aQeT3-S__VuNBlRj4po_HRthJjeJNPcI",
    action: "Leave Req",
    time: "09:12 AM",
    status: "pending",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrAEOV3323yicFm5ILydIto5yL_H97zjBYYFdclZ41TOSxHyn4s1YzcTOfsB-sZF-ss1FWVsSbBB1eEm_c1XcbyIVd-1PlPvK3ySmj6zK4ZEZQ9LF77R32K9-DBlbk6ADUHUn5BZOzI78xZ066c1rUd2SP8qMd5BWsgtYB5wVR2LAqr-XNSUaPzT1hZPnW1iaC3XYZB5CV2_NUQFP2fALdM0KpAi5PmGTYnhdWBz4i7ewiFB6pO0iiOaOckrxIaSED9Yl_SWYmYs8",
    action: "Clock In",
    time: "09:30 AM",
    status: "late",
  },
];

function Avatar({ name, avatarUrl }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="size-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: "#137fec" }}
    >
      {name.charAt(0)}
    </div>
  );
}

export function RecentActivity({ activities = defaultActivities, onViewAll }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white">
          Recent Activity
        </h3>
        <button
          onClick={onViewAll}
          className="text-[#137fec] text-xs font-bold hover:underline"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 dark:border-slate-800">
            <tr>
              {["Employee", "Action", "Time", "Status"].map((col) => (
                <th
                  key={col}
                  className="py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {activities.map((row) => (
              <tr key={row.id}>
                {/* Employee */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={row.name} avatarUrl={row.avatarUrl} />
                    <span className="text-sm font-medium text-[#111418] dark:text-white">
                      {row.name}
                    </span>
                  </div>
                </td>

                {/* Action */}
                <td className="py-4 text-sm text-[#111418] dark:text-slate-300">
                  {row.action}
                </td>

                {/* Time */}
                <td className="py-4 text-sm text-slate-500">{row.time}</td>

                {/* Status */}
                <td className="py-4">
                  <span
                    className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded uppercase",
                      statusStyles[row.status] ?? "bg-slate-100 text-slate-600",
                    )}
                  >
                    {statusLabels[row.status] ?? row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
