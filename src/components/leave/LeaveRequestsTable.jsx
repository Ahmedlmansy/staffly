import { useState } from "react";
import { CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  Pending:
    "bg-amber-100  text-amber-800  dark:bg-amber-900/30  dark:text-amber-400",
  Approved:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Rejected:
    "bg-rose-100   text-rose-800   dark:bg-rose-900/30   dark:text-rose-400",
};

const avatarColors = [
  "bg-blue-100   text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-green-100  text-green-600",
  "bg-pink-100   text-pink-600",
];

const mockRequests = [
  {
    id: 1,
    initials: "JD",
    name: "Jane Doe",
    position: "Product Designer",
    leaveType: "Annual Leave",
    dateFrom: "Nov 15",
    dateTo: "Nov 18",
    days: 4,
    status: "Pending",
    colorIdx: 0,
  },
  {
    id: 2,
    initials: "MS",
    name: "Marcus Smith",
    position: "DevOps Engineer",
    leaveType: "Sick Leave",
    dateFrom: "Nov 08",
    dateTo: "Nov 09",
    days: 2,
    status: "Approved",
    colorIdx: 1,
  },
  {
    id: 3,
    initials: "AL",
    name: "Anna Lee",
    position: "HR Specialist",
    leaveType: "Personal Leave",
    dateFrom: "Dec 01",
    dateTo: "Dec 01",
    days: 1,
    status: "Rejected",
    colorIdx: 2,
  },
  {
    id: 4,
    initials: "RW",
    name: "Robert Wilson",
    position: "Backend Developer",
    leaveType: "Annual Leave",
    dateFrom: "Dec 20",
    dateTo: "Jan 02",
    days: 14,
    status: "Pending",
    colorIdx: 3,
  },
];

const FILTER_TABS = ["All", "Pending", "Approved"];
const PAGE_SIZE = 4;

export function LeaveRequestsTable({
  requests = mockRequests,
  onApprove,
  onReject,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered =
    activeFilter === "All"
      ? requests
      : requests.filter((r) => r.status === activeFilter);

  const totalCount = filtered.length;
  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleFilter = (tab) => {
    setActiveFilter(tab);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-[#34414e] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#dbe0e6] dark:border-[#34414e] flex justify-between items-center">
        <h2 className="text-[#111418] dark:text-white text-xl font-bold">
          Recent Leave Requests
        </h2>
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilter(tab)}
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors",
                activeFilter === tab
                  ? "bg-[#137fec]/10 text-[#137fec]"
                  : "text-[#617589] hover:bg-slate-100 dark:hover:bg-[#232f3e]",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-[#232f3e]/50 text-[#617589] text-xs uppercase tracking-wider">
              {["Employee", "Leave Type", "Duration", "Status", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className={cn(
                      "px-6 py-4 font-bold",
                      col === "Actions" && "text-right",
                    )}
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#34414e]">
            {paginated.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-[#232f3e]/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "size-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0",
                        avatarColors[row.colorIdx ?? 0],
                      )}
                    >
                      {row.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111418] dark:text-white">
                        {row.name}
                      </p>
                      <p className="text-[11px] text-[#617589]">
                        {row.position}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#111418] dark:text-white">
                  {row.leaveType}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#111418] dark:text-white">
                    {row.dateFrom} - {row.dateTo}
                  </p>
                  <p className="text-[11px] text-[#617589]">
                    {row.days} day{row.days > 1 ? "s" : ""}
                  </p>
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
                <td className="px-6 py-4 text-right">
                  {row.status === "Pending" ? (
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onApprove?.(row)}
                        title="Approve"
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <CheckCircle className="size-5" />
                      </button>
                      <button
                        onClick={() => onReject?.(row)}
                        title="Reject"
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                      >
                        <XCircle className="size-5" />
                      </button>
                    </div>
                  ) : (
                    <button className="p-1.5 rounded-lg text-[#617589] hover:bg-slate-100 dark:hover:bg-[#232f3e] transition-colors">
                      <MoreVertical className="size-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-[#617589]"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-slate-50/30 dark:bg-[#1a2632] border-t border-[#dbe0e6] dark:border-[#34414e] flex items-center justify-between">
        <p className="text-xs text-[#617589]">
          Showing {paginated.length} of {totalCount} requests
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs border border-[#dbe0e6] dark:border-[#34414e] rounded bg-white dark:bg-[#232f3e] dark:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs border border-[#dbe0e6] dark:border-[#34414e] rounded bg-white dark:bg-[#232f3e] dark:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
