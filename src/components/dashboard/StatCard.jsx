import { Users, CalendarCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultCards = [
  {
    title: "Total Employees",
    value: "1,248",
    icon: Users,
    iconColor: "text-[#137fec]",
    iconBg: "bg-[#137fec]/10",
    badge: "+2% this month",
    badgeColor: "text-emerald-500",
  },
  {
    title: "Today's Attendance",
    value: "92%",
    icon: CalendarCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    badge: "Optimal",
    badgeColor: "text-emerald-500",
  },
  {
    title: "Pending Leave Requests",
    value: "14",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 dark:bg-amber-950/30",
    badge: "Action required",
    badgeColor: "text-amber-600",
  },
];

function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  badge,
  badgeColor,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
      {/* Top row: icon + badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={cn("p-2 rounded-lg", iconColor, iconBg)}>
          <Icon className="size-5" />
        </span>
        <span className={cn("text-xs font-bold", badgeColor)}>{badge}</span>
      </div>

      {/* Label */}
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {title}
      </p>

      {/* Value */}
      <p className="text-3xl font-bold text-[#111418] dark:text-white">
        {value}
      </p>
    </div>
  );
}

export function StatsCards({ cards = defaultCards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
