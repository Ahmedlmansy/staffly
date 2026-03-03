const statsConfig = [
  {
    key: "totalRequests",
    label: "Total Requests",
    valueClass: "text-[#137fec]",
  },
  {
    key: "approvedThisMonth",
    label: "Approved This Month",
    valueClass: "text-emerald-600",
  },
  { key: "currentlyOut", label: "Currently Out", valueClass: "text-amber-600" },
];

export function LeaveStatsCards({ stats }) {
  const {
    totalRequests = 124,
    approvedThisMonth = 86,
    currentlyOut = 12,
  } = stats ?? {};
  const values = { totalRequests, approvedThisMonth, currentlyOut };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsConfig.map((card) => (
        <div
          key={card.key}
          className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-[#dbe0e6] dark:border-[#34414e] shadow-sm"
        >
          <p className="text-xs font-bold text-[#617589] uppercase mb-1">
            {card.label}
          </p>
          <p className={"text-2xl font-black " + card.valueClass}>
            {values[card.key]}
          </p>
        </div>
      ))}
    </div>
  );
}
