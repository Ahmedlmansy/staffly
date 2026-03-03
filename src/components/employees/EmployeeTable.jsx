import { cn } from "@/lib/utils";

const statusConfig = {
  Active: {
    label: "Active",
    class:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
  },
  Inactive: {
    label: "Inactive",
    class: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400",
  },
  Terminated: {
    label: "Terminated",
    class: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
  },
};

// Deterministic color per initials
const avatarColors = [
  "bg-[#137fec]/20 text-[#137fec]",
  "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
  "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
  "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
  "bg-rose-100 dark:bg-rose-900/30 text-rose-600",
];

function getAvatarColor(name = "") {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

function getInitials(firstName = "", lastName = "") {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function EmployeeAvatar({ firstName, lastName, avatarUrl }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        className="size-9 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  const initials = getInitials(firstName, lastName);
  const colorClass = getAvatarColor(firstName);
  return (
    <div
      className={cn(
        "size-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
        colorClass,
      )}
    >
      {initials}
    </div>
  );
}

export function EmployeeTable({ employees = [], onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="bg-white dark:bg-[#101922] rounded-xl border border-[#dbe0e6] dark:border-[#2a3541] shadow-sm">
        <div className="py-20 text-center text-[#617589] dark:text-gray-400 text-sm">
          No employees found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#101922] rounded-xl border border-[#dbe0e6] dark:border-[#2a3541] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-[#1b2531]">
              {[
                "Name",
                "Department",
                "Position",
                "Employment Type",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-6 py-4 text-[#111418] dark:text-white text-sm font-bold border-b border-[#dbe0e6] dark:border-[#2a3541]",
                    col === "Actions" && "text-right",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
              const status = statusConfig[emp.status] ?? statusConfig.Inactive;
              const isLast = idx === employees.length - 1;

              return (
                <tr
                  key={emp.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-colors",
                    !isLast &&
                      "border-b border-[#dbe0e6] dark:border-[#2a3541]",
                  )}
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <EmployeeAvatar
                        firstName={emp.first_name}
                        lastName={emp.last_name}
                        avatarUrl={emp.avatar_url}
                      />
                      <div>
                        <p className="text-[#111418] dark:text-white text-sm font-semibold">
                          {emp.first_name} {emp.last_name}
                        </p>
                        <p className="text-[#617589] dark:text-gray-400 text-xs">
                          {emp.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-[#617589] dark:text-gray-400 text-sm">
                    {emp.departments?.name ?? "—"}
                  </td>

                  {/* Position */}
                  <td className="px-6 py-4 text-[#617589] dark:text-gray-400 text-sm">
                    {emp.position ?? "—"}
                  </td>

                  {/* Employment Type */}
                  <td className="px-6 py-4 text-[#617589] dark:text-gray-400 text-sm">
                    {emp.employment_type ?? "—"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.class,
                      )}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onEdit(emp)}
                      className="text-[#137fec] hover:text-[#137fec]/80 font-bold text-sm mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(emp)}
                      className="text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
