import { LogIn, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

const summaryCards = [
  {
    label: "Total Days",
    key: "totalDays",
    valueClass: "text-[#111418] dark:text-white",
  },
  { label: "Present", key: "present", valueClass: "text-green-600" },
  { label: "Late/Absent", key: "lateAbsent", valueClass: "text-red-500" },
];

export function CheckInPanel({ stats, isCheckedIn, onCheckIn }) {
  const { totalDays = 22, present = 19, lateAbsent = 3 } = stats ?? {};

  const values = { totalDays, present, lateAbsent };

  return (
    <div className="flex flex-col gap-4">
      {/* Check-in Card */}
      <div className="rounded-xl border border-[#dbe0e6] dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div
            className="size-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "rgba(19,127,236,0.1)",
              color: "#137fec",
            }}
          >
            <LogIn className="size-7" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#111418] dark:text-white text-xl font-bold">
              Daily Check-in
            </p>
            <p className="text-[#617589] dark:text-gray-400 text-sm">
              Shift starts at 09:00 AM · Status:{" "}
              <span
                className={cn(
                  "font-semibold",
                  isCheckedIn ? "text-green-600" : "text-red-500",
                )}
              >
                {isCheckedIn ? "Checked In" : "Checked Out"}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={onCheckIn}
          className={cn(
            "w-full md:w-auto min-w-[160px] h-12 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 text-white",
            isCheckedIn ? "bg-red-500 hover:bg-red-600" : "hover:opacity-90",
          )}
          style={!isCheckedIn ? { backgroundColor: "#137fec" } : {}}
        >
          <Fingerprint className="size-5" />
          {isCheckedIn ? "Check-out Now" : "Check-in Now"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.key}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-[#dbe0e6] dark:border-gray-800"
          >
            <p className="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
              {card.label}
            </p>
            <p className={cn("text-2xl font-black mt-1", card.valueClass)}>
              {String(values[card.key]).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
