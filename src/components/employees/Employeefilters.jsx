import { ChevronDown, ListFilter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DEPARTMENTS = ["Engineering", "Marketing", "HR", "Finance", "Sales"];
const STATUSES = ["Active", "Inactive", "Terminated"];

export function EmployeeFilters({ filters, onFilterChange, onClearAll }) {
  const hasActiveFilters = filters.department || filters.status;

  return (
    <div className="flex gap-3 mb-6 flex-wrap items-center">
      <span className="text-sm font-semibold text-[#617589] dark:text-gray-400 mr-2 uppercase tracking-wider">
        Filters:
      </span>

      {/* All Departments — active chip */}
      <button
        className={cn(
          "flex h-9 shrink-0 items-center gap-x-2 rounded-lg px-4 text-sm font-semibold transition-colors",
          !filters.department
            ? "bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20"
            : "bg-white dark:bg-[#1f2937] border border-[#dbe0e6] dark:border-[#2a3541] text-[#111418] dark:text-gray-300",
        )}
        onClick={() => onFilterChange({ department: "" })}
      >
        All Departments
        <ListFilter className="size-4" />
      </button>

      {/* Department chips */}
      {DEPARTMENTS.map((dept) => (
        <button
          key={dept}
          className={cn(
            "flex h-9 shrink-0 items-center gap-x-2 rounded-lg px-4 text-sm font-medium transition-colors",
            filters.department === dept
              ? "bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20 font-semibold"
              : "bg-white dark:bg-[#1f2937] border border-[#dbe0e6] dark:border-[#2a3541] text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
          )}
          onClick={() =>
            onFilterChange({
              department: filters.department === dept ? "" : dept,
            })
          }
        >
          {dept}
          <ChevronDown className="size-4" />
        </button>
      ))}

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />

      {/* Status chips */}
      {STATUSES.map((status) => (
        <button
          key={status}
          className={cn(
            "flex h-9 shrink-0 items-center gap-x-2 rounded-lg px-4 text-sm font-medium transition-colors",
            filters.status === status
              ? "bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20 font-semibold"
              : "bg-white dark:bg-[#1f2937] border border-[#dbe0e6] dark:border-[#2a3541] text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
          )}
          onClick={() =>
            onFilterChange({ status: filters.status === status ? "" : status })
          }
        >
          Status: {status}
          <ChevronDown className="size-4" />
        </button>
      ))}

      {/* Clear All */}
      {hasActiveFilters && (
        <>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-[#137fec] text-sm font-bold hover:underline"
          >
            <X className="size-3.5" />
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
