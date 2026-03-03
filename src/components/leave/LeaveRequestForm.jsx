import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const leaveSchema = z.object({
  leaveType: z.string().min(1, "Please select a leave type"),
  reason: z.string().optional(),
});

const LEAVE_TYPES = [
  { value: "annual", label: "Annual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "maternity", label: "Maternity/Paternity" },
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function MiniCalendar({ startDate, endDate, onSelectDate }) {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    const d = new Date(year, month, day);
    return d > startDate && d < endDate;
  };

  const isStart = (day) =>
    startDate &&
    new Date(year, month, day).toDateString() === startDate.toDateString();
  const isEnd = (day) =>
    endDate &&
    new Date(year, month, day).toDateString() === endDate.toDateString();

  const handleClick = (day) => {
    const clicked = new Date(year, month, day);
    onSelectDate(clicked);
  };

  const cells = [];

  // Prev month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, current: false, key: `prev-${i}` });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, key: `cur-${d}` });
  }

  return (
    <div className="bg-slate-50 dark:bg-[#232f3e] rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-[#137fec]/10 transition-colors"
          style={{ color: "#137fec" }}
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="text-sm font-bold text-[#111418] dark:text-white">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-[#137fec]/10 transition-colors"
          style={{ color: "#137fec" }}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center text-xs font-bold text-[#617589] mb-2">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map(({ day, current, key }) => {
          const inRange = current && isInRange(day);
          const isS = current && isStart(day);
          const isE = current && isEnd(day);
          const selected = isS || isE;

          return (
            <button
              key={key}
              type="button"
              disabled={!current}
              onClick={() => current && handleClick(day)}
              className={cn(
                "h-8 w-full text-xs rounded-lg transition-colors",
                !current && "text-gray-400 cursor-default",
                current &&
                  !selected &&
                  !inRange &&
                  "hover:bg-[#137fec]/20 text-[#111418] dark:text-white",
                inRange && "bg-[#137fec]/20 text-[#137fec] font-bold",
                selected && "text-white font-bold",
              )}
              style={selected ? { backgroundColor: "#137fec" } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function LeaveRequestForm({ onSubmit, isLoading }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: { leaveType: "", reason: "" },
  });

  const handleSelectDate = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const getDayCount = () => {
    if (!startDate || !endDate) return 0;
    return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (values) => {
    onSubmit?.({ ...values, startDate, endDate, days: getDayCount() });
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-[#34414e] p-6 shadow-sm">
      <h2 className="text-[#111418] dark:text-white text-xl font-bold mb-6">
        Request New Leave
      </h2>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Leave Type */}
        <div className="flex flex-col gap-2">
          <label className="text-[#111418] dark:text-white text-sm font-semibold">
            Leave Type
          </label>
          <select
            {...form.register("leaveType")}
            className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#34414e] bg-white dark:bg-[#232f3e] dark:text-white h-12 px-3 text-sm focus:outline-none focus:ring-2 focus:border-[#137fec]"
          >
            <option value="">Select type...</option>
            {LEAVE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {form.formState.errors.leaveType && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.leaveType.message}
            </p>
          )}
        </div>

        {/* Calendar */}
        <div className="flex flex-col gap-2">
          <p className="text-[#111418] dark:text-white text-sm font-semibold">
            Select Dates
          </p>
          <MiniCalendar
            startDate={startDate}
            endDate={endDate}
            onSelectDate={handleSelectDate}
          />
          {startDate && (
            <p className="text-xs text-[#617589] dark:text-slate-400 text-center">
              {startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              {endDate &&
                ` → ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${getDayCount()} day${getDayCount() > 1 ? "s" : ""}`}
            </p>
          )}
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-2">
          <label className="text-[#111418] dark:text-white text-sm font-semibold">
            Reason{" "}
            <span className="text-[#617589] font-normal">(Optional)</span>
          </label>
          <textarea
            {...form.register("reason")}
            rows={3}
            placeholder="Briefly describe the reason..."
            className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#34414e] bg-white dark:bg-[#232f3e] dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:border-[#137fec] resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white font-bold h-12 rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-60"
          style={{ backgroundColor: "#137fec" }}
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
