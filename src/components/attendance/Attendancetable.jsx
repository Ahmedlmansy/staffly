import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  Present:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Absent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const MONTHS = ["Current Month", "September 2024", "August 2024", "July 2024"];

const PAGE_SIZE = 5;

const mockRecords = [
  {
    id: 1,
    date: "Oct 13, 2024",
    checkIn: "08:52 AM",
    checkOut: "05:45 PM",
    hours: "08h 53m",
    status: "Present",
    overtime: "0h 45m",
    lateCheckIn: false,
  },
  {
    id: 2,
    date: "Oct 12, 2024",
    checkIn: "09:15 AM",
    checkOut: "05:00 PM",
    hours: "07h 45m",
    status: "Late",
    overtime: "-",
    lateCheckIn: true,
  },
  {
    id: 3,
    date: "Oct 11, 2024",
    checkIn: "08:58 AM",
    checkOut: "06:15 PM",
    hours: "09h 17m",
    status: "Present",
    overtime: "1h 15m",
    lateCheckIn: false,
  },
  {
    id: 4,
    date: "Oct 10, 2024",
    checkIn: "-",
    checkOut: "-",
    hours: "00h 00m",
    status: "Absent",
    overtime: "-",
    lateCheckIn: false,
  },
  {
    id: 5,
    date: "Oct 09, 2024",
    checkIn: "08:45 AM",
    checkOut: "05:05 PM",
    hours: "08h 20m",
    status: "Present",
    overtime: "0h 05m",
    lateCheckIn: false,
  },
];

function Pagination({ currentPage, totalPages, totalCount, onPageChange }) {
  return (
    <div className="p-6 border-t border-[#f0f2f4] dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">
        Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
        {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount} entries
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              page === currentPage
                ? "text-white"
                : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
            style={page === currentPage ? { backgroundColor: "#137fec" } : {}}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function AttendanceTable({ records = mockRecords, onViewDetail }) {
  const [selectedMonth, setSelectedMonth] = useState("Current Month");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(records.length / PAGE_SIZE);
  const paginated = records.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbe0e6] dark:border-gray-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-[#f0f2f4] dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
        <h3 className="text-[#111418] dark:text-white font-bold text-lg">
          Daily Attendance History
        </h3>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setCurrentPage(1);
          }}
          className="text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": "#137fec" }}
        >
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-gray-900 text-[#617589] dark:text-gray-400 text-xs font-bold uppercase">
              {[
                "Date",
                "Check-in",
                "Check-out",
                "Working Hours",
                "Status",
                "Overtime",
                "Actions",
              ].map((col) => (
                <th key={col} className="px-6 py-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {paginated.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-[#111418] dark:text-white font-medium">
                  {row.date}
                </td>
                <td
                  className={cn(
                    "px-6 py-4",
                    row.lateCheckIn
                      ? "text-red-500"
                      : "text-[#617589] dark:text-gray-400",
                  )}
                >
                  {row.checkIn}
                </td>
                <td className="px-6 py-4 text-[#617589] dark:text-gray-400">
                  {row.checkOut}
                </td>
                <td className="px-6 py-4 text-[#111418] dark:text-white">
                  {row.hours}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusConfig[row.status],
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#617589] dark:text-gray-400">
                  {row.overtime}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetail?.(row)}
                    className="text-gray-400 hover:text-[#137fec] transition-colors"
                  >
                    <Info className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(totalPages, 1)}
        totalCount={records.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
