import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmployeePagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-4 gap-4">
      {/* Count */}
      <p className="text-sm text-[#617589] dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-[#111418] dark:text-white">
          {from}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#111418] dark:text-white">
          {to}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#111418] dark:text-white">
          {totalCount}
        </span>{" "}
        employees
      </p>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-[#111418] dark:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Page numbers */}
        {getPages().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex size-10 items-center justify-center text-sm text-[#617589] dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                page === currentPage
                  ? "text-white shadow-sm"
                  : "text-[#111418] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800",
              )}
              style={page === currentPage ? { backgroundColor: "#137fec" } : {}}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-[#111418] dark:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
